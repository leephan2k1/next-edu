import { memo, useState, useEffect } from 'react';
import useCourse from '~/contexts/CourseContext';
import { useIsFirstRender } from 'usehooks-ts';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/solid';

import LectureCreation from './LectureCreation';

import type { Dispatch, SetStateAction } from 'react';

interface ChapterCreationProps {
  chapterIndex: number;
  removeChapter: Dispatch<SetStateAction<number[]>>;
}

function ChapterCreation({
  chapterIndex,
  removeChapter,
}: ChapterCreationProps) {
  const [numberLecture, setNumberLecture] = useState<number[]>([1]);
  const [animationParent] = useAutoAnimate<HTMLDivElement>();
  const [shouldShowInput, setShouldShowInput] = useState(false);
  const [chapterTitle, setChapterTitle] = useState(() =>
    chapterIndex === 1 ? 'Giới thiệu' : '',
  );
  const isFirst = useIsFirstRender();

  const courseCtx = useCourse();

  const [isUpdated, setIsUpdated] = useState(false);

  //hook update course values
  useEffect(() => {
    if (!isFirst) {
      const payload = { title: chapterTitle, order: chapterIndex };

      if (courseCtx?.course?.chapters) {
        // if chapter exists in global value => return
        if (
          courseCtx?.course?.chapters.find(
            (elem) => elem.order === payload.order,
          )
        ) {
          return;
        }

        courseCtx?.updateCourse({
          chapters: [...courseCtx.course?.chapters, payload],
        });
        setIsUpdated(true);
      } else {
        courseCtx?.updateCourse({
          chapters: [payload],
        });
        setIsUpdated(true);
      }
    }
  }, [courseCtx?.dispatchUpdate]);

  return (
    <div
      ref={animationParent}
      className="flex flex-col space-y-4 rounded-xl bg-white p-4 dark:bg-[#3b3b3b] md:w-3/4"
    >
      <div className="flex items-center justify-between">
        <h1>
          Chương {chapterIndex}: {chapterTitle}
        </h1>

        <div className="flex space-x-6">
          <button
            onClick={() => setShouldShowInput((prevState) => !prevState)}
            className="smooth-effect hover:text-yellow-400"
          >
            <PencilIcon className="h-8 w-8" />
          </button>
          <button
            onClick={() =>
              removeChapter((prev) => {
                return prev.filter((idx) => idx !== chapterIndex);
              })
            }
            className="smooth-effect hover:text-rose-500"
          >
            <TrashIcon className="h-8 w-8" />
          </button>
        </div>
      </div>

      {shouldShowInput && (
        <>
          <input
            onChange={(event) => {
              setChapterTitle(event.currentTarget.value);
            }}
            type="text"
            className="rounded border border-gray-600 p-3 dark:border-white/70"
            value={chapterTitle}
          />
          <button
            onClick={() => setShouldShowInput((prevState) => !prevState)}
            className="ml-auto w-fit rounded-lg border border-gray-600 p-2 dark:border-white/70"
          >
            Lưu
          </button>
        </>
      )}

      <div className="flex flex-col space-y-6 md:px-6">
        {numberLecture.map((item) => {
          return (
            <LectureCreation
              chapterUpdated={isUpdated}
              chapterIndex={chapterIndex}
              removeLecture={setNumberLecture}
              lectureIndex={item}
              key={item}
            />
          );
        })}
      </div>

      <button
        onClick={() =>
          setNumberLecture((prev) => {
            return [
              ...prev,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              prev[prev.length - 1] ? prev[prev.length - 1] + 1 : 1,
            ];
          })
        }
        className="absolute-center w-fit space-x-3 rounded-xl border border-gray-500 p-3"
      >
        <PlusIcon className="h-8 w-8" />
        <span className="text-xl">Thêm bài học</span>
      </button>
    </div>
  );
}

export default memo(ChapterCreation);
