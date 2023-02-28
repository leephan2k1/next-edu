import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useAtom, useAtomValue } from 'jotai';
import { Fragment } from 'react';
import {
  previewModalState,
  resources as resourcesAtom,
} from '~/atoms/previewLectureAtom';

export default function PreviewLectureModal() {
  const [isOpen, setIsOpen] = useAtom(previewModalState);
  const resources = useAtomValue(resourcesAtom);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[400]" onClose={setIsOpen}>
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
                <Dialog.Panel className="flex h-[80vh] w-[50rem] transform flex-col overflow-y-scroll rounded-2xl bg-white p-6 text-left align-middle  shadow-xl transition-all dark:bg-dark-background md:h-[65vh] lg:h-[80vh]">
                  <Dialog.Title
                    as="div"
                    className="my-4 mx-4 flex items-center justify-between md:my-6"
                  >
                    <h2 className="text-2xl font-medium uppercase leading-6 md:text-3xl">
                      Xem trước bài học
                    </h2>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-3 md:p-2"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </Dialog.Title>

                  {resources &&
                    resources.length > 0 &&
                    resources.map((rsc) => {
                      if (rsc.type === 'video') {
                        return (
                          <>
                            {' '}
                            <h2 className="my-2">Video bài học:</h2>
                            <video className="aspect-video" controls>
                              <source src={rsc.url}></source>
                            </video>
                          </>
                        );
                      }

                      return (
                        <>
                          <h2 className="my-2">Tài liệu bài học:</h2>
                          <a
                            className="text-blue-500"
                            href={rsc.url}
                            target={'_blank'}
                            rel="noreferrer"
                          >
                            {rsc.name}
                          </a>
                        </>
                      );
                    })}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
