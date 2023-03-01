import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Disclosure } from '@headlessui/react';
import {
  CheckIcon,
  ChevronUpIcon,
  LockClosedIcon,
} from '@heroicons/react/20/solid';
import { PlayCircleIcon } from '@heroicons/react/24/solid';
import { Else, If, Then } from 'react-if';
import type { ChapterType, LectureType, Progress } from '~/types';
import toast from 'react-hot-toast';
import { unlockLectureHelper } from '~/utils/general';

interface CourseContentCollapseProps {
  chapter: ChapterType;
  allLecturesByChapters: LectureType[];
  isLoadingProgress: boolean;
  progressByCourse: Progress[];
  handleNavigateLecture: (lectureId: string) => void;
}

export default function CourseContentCollapse({
  chapter,
  handleNavigateLecture,
  progressByCourse,
  allLecturesByChapters,
  isLoadingProgress,
}: CourseContentCollapseProps) {
  const [animationParent] = useAutoAnimate<HTMLDivElement>();

  return (
    <div className="w-full">
      <div className="mx-auto w-full px-2" ref={animationParent}>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full flex-col rounded-xl bg-stone-300 px-4 py-2 text-left text-lg font-medium dark:border-white dark:bg-black md:text-2xl">
                <div className="flex w-full items-center justify-between">
                  {chapter.order}. {chapter.title}
                  <ChevronUpIcon
                    className={`${open ? 'rotate-180 transform' : ''} h-8 w-8`}
                  />
                </div>
                <div className="flex text-base text-gray-400 dark:text-white/60 md:text-xl">
                  <span>0/5</span>
                  <span>| 30:33</span>
                </div>
              </Disclosure.Button>
              <Disclosure.Panel>
                <ul className="mx-auto w-full space-y-6 px-2 py-4 text-lg md:text-xl">
                  {chapter &&
                    chapter.lectures &&
                    chapter.lectures.length > 0 &&
                    chapter.lectures.map((lecture) => {
                      return (
                        <li
                          onClick={() => {
                            if (
                              !progressByCourse.some(
                                (elem) => elem?.id === lecture.id,
                              ) &&
                              unlockLectureHelper(
                                progressByCourse,
                                allLecturesByChapters,
                              )?.id !== lecture.id
                            ) {
                              toast.error(
                                'Bạn chưa hoàn thành bài học trước đó!',
                              );
                              return;
                            }
                            handleNavigateLecture(lecture.id);
                          }}
                          key={lecture.id}
                          className="flex cursor-pointer flex-col space-y-2 rounded-xl border border-dashed border-gray-500 py-2 px-4"
                        >
                          <If condition={isLoadingProgress}>
                            <Then>
                              <div className="h-[5rem] w-full animate-pulse rounded-xl bg-gray-300 dark:bg-gray-600"></div>
                            </Then>
                            <Else>
                              <>
                                <div className="flex items-center justify-between">
                                  <h3 className="text-left">
                                    {lecture.order}. {lecture.title}
                                  </h3>

                                  <If
                                    condition={
                                      progressByCourse.length > 0 &&
                                      progressByCourse.find(
                                        (elem) => elem?.id === lecture.id,
                                      )
                                    }
                                  >
                                    <Then>
                                      <span className="rounded-full bg-green-400 p-2">
                                        <CheckIcon className="h-3 w-3 text-gray-700" />
                                      </span>
                                    </Then>
                                    <Else>
                                      {unlockLectureHelper(
                                        progressByCourse,
                                        allLecturesByChapters,
                                      )?.id === lecture.id ? null : (
                                        <span className="rounded-full p-2">
                                          <LockClosedIcon className="h-5 w-5 text-gray-700" />
                                        </span>
                                      )}
                                    </Else>
                                  </If>
                                </div>

                                <div className="flex items-center space-x-2">
                                  <PlayCircleIcon className="h-6 w-6 text-gray-400" />
                                  <span>
                                    {lecture.resources.find(
                                      (rsc) => rsc.type === 'video',
                                    )
                                      ? `${Math.floor(
                                          Number(
                                            lecture.resources.find(
                                              (rsc) => rsc.type === 'video',
                                            )?.videoDuration,
                                          ) / 60,
                                        )} phút`
                                      : ''}
                                  </span>
                                </div>
                              </>
                            </Else>
                          </If>
                        </li>
                      );
                    })}
                </ul>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
