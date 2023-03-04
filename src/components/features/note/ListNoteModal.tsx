import { useAtom } from 'jotai';
import { Fragment, memo, useState } from 'react';
import { listNoteModalState } from '~/atoms/listNoteModal';
import SelectButton from '~/components/buttons/Select';
import { trpc } from '~/utils/trpc';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import Loading from '~/components/buttons/Loading';
import useLecture from '~/contexts/LearningContext';
import NoteItem from './NoteItem';

const selectedNoteByDateOptions = [
  { label: 'Mới nhất', value: 'desc' },
  { label: 'Cũ nhất', value: 'asc' },
];

const selectedNoteByTypeOptions = [
  { label: 'Bài học hiện tại', value: 'currentLecture' },
  { label: 'Chương hiện tại', value: 'currentChapter' },
  { label: 'Tất cả chương', value: 'allLesson' },
];

function ListNoteModal() {
  const [selectedNoteByDate, setSelectedNoteByDate] = useState(
    selectedNoteByDateOptions[0],
  );

  const [selectedNoteByType, setSelectedNoteByType] = useState(
    selectedNoteByTypeOptions[0],
  );

  const lectureCtx = useLecture();

  const [animationParent] = useAutoAnimate<HTMLDivElement>();

  const [isOpen, setIsOpen] = useAtom(listNoteModalState);

  function closeModal() {
    setIsOpen(false);
  }

  const {
    data: notes,
    isLoading,
    refetch,
  } = trpc.user.findNotes.useQuery(
    {
      // zod error???
      sort: selectedNoteByDate?.value === 'asc' ? 'asc' : 'desc',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      chapterId:
        selectedNoteByType?.value === 'currentChapter'
          ? lectureCtx?.currentLecture?.chapterId
          : undefined,
      lectureId:
        selectedNoteByType?.value === 'currentLecture'
          ? lectureCtx?.currentLecture?.id
          : undefined,
    },
    { enabled: isOpen },
  );

  const refetchNotes = () => {
    refetch();
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[500]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto text-gray-600 dark:text-white/80">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="h-[75vh] w-[35rem] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-dark-background md:w-[65rem] lg:h-[90vh]">
                  <Dialog.Title as="div" className="flex justify-between">
                    <div className="flex w-full space-x-4">
                      <PencilSquareIcon className="h-8 w-8" />
                      <h1 className="text-2xl font-medium leading-6 md:text-3xl">
                        Ghi chú của tôi
                      </h1>
                    </div>

                    <button
                      onClick={() => setIsOpen(false)}
                      className="smooth-effect rounded-xl border border-gray-500 p-3 hover:text-rose-500"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </Dialog.Title>

                  <div className="mt-4 flex items-center space-x-4 text-gray-500">
                    <SelectButton
                      option={selectedNoteByType}
                      setOption={setSelectedNoteByType}
                      options={selectedNoteByTypeOptions}
                    />
                    <SelectButton
                      option={selectedNoteByDate}
                      setOption={setSelectedNoteByDate}
                      options={selectedNoteByDateOptions}
                    />
                  </div>

                  {isLoading ? (
                    <div className="full-size absolute-center">
                      <Loading />
                    </div>
                  ) : (
                    <div
                      ref={animationParent}
                      className="mt-6 max-h-full overflow-y-scroll pb-32"
                    >
                      <ul className="flex w-full flex-col space-y-4">
                        {notes &&
                          notes.length > 0 &&
                          notes.map((note) => {
                            return (
                              <NoteItem
                                key={note.id}
                                note={note}
                                refetchNotes={refetchNotes}
                              />
                            );
                          })}
                      </ul>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default memo(ListNoteModal);
