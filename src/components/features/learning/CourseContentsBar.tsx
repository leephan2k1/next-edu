import { useAtom } from 'jotai';
import { Fragment, memo } from 'react';
import { courseContentBarState } from '~/atoms/courseContentBarState';

import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import CourseContentCollapse from './CourseContentCollapse';
import type { ChapterType } from '~/types';

interface CourseContentsBarProps {
  chapters: ChapterType[];
}

function CourseContentsBar({ chapters }: CourseContentsBarProps) {
  const [open, setOpen] = useAtom(courseContentBarState);

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[500] text-gray-600 dark:text-white/80"
        onClose={() => {
          setOpen(false);
        }}
      >
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

        <div className="fixed right-0 top-0 h-fit">
          <div className="flex h-fit items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-200 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-200 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="flex h-screen min-h-screen w-[80vw] transform flex-col space-y-4 overflow-y-scroll bg-light-background px-2 py-10 shadow-xl transition-all dark:bg-dark-background md:w-[40rem] lg:w-[30rem]">
                <Dialog.Title className="flex items-center justify-between px-4">
                  <h2 className="px-2 text-left text-3xl">Nội dung khoá học</h2>

                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-xl border border-gray-600 p-2 md:p-3"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </Dialog.Title>

                <Dialog.Description className="flex flex-col space-y-4">
                  {chapters &&
                    chapters.length > 0 &&
                    chapters.map((chapter) => {
                      return (
                        <CourseContentCollapse
                          key={chapter.id}
                          chapter={chapter}
                        />
                      );
                    })}
                </Dialog.Description>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default memo(CourseContentsBar);
