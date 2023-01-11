import { useAtom } from 'jotai';
import { Fragment, memo } from 'react';
import { listNoteModalState } from '~/atoms/listNoteModal';
import SelectButton from '~/components/buttons/Select';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';

import NoteItem from './NoteItem';

function ListNoteModal() {
  const [animationParent] = useAutoAnimate<HTMLDivElement>();

  const [isOpen, setIsOpen] = useAtom(listNoteModalState);

  function closeModal() {
    setIsOpen(false);
  }

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
                    <h1 className="text-2xl font-medium leading-6 md:text-3xl">
                      Ghi chú của tôi
                    </h1>

                    <button
                      onClick={() => setIsOpen(false)}
                      className="smooth-effect rounded-xl border border-gray-500 p-3 hover:text-rose-500"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </Dialog.Title>

                  <div className="mt-4 flex items-center space-x-4 text-gray-500">
                    <SelectButton
                      options={[
                        { label: 'Chương hiện tại', value: 'currentLesson' },
                        { label: 'Tất cả chương', value: 'allLesson' },
                      ]}
                    />
                    <SelectButton
                      options={[
                        { label: 'Mới nhất', value: 'latest' },
                        { label: 'Cũ nhất', value: 'oldest' },
                      ]}
                    />
                  </div>

                  <div
                    ref={animationParent}
                    className="mt-6 max-h-full overflow-y-scroll pb-32"
                  >
                    <ul className="flex w-full flex-col space-y-4 ">
                      <NoteItem />
                      <NoteItem />
                      <NoteItem />
                      <NoteItem />
                    </ul>
                  </div>
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
