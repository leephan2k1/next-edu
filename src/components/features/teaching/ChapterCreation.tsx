import { useAutoAnimate } from '@formkit/auto-animate/react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/solid';
import { memo, useEffect, useState, useMemo } from 'react';
import type { ChapterType } from '~/types';

import LectureCreation from './LectureCreation';

import type { Dispatch, SetStateAction } from 'react';

interface ChapterCreationProps {
  chapters?: ChapterType[];
  chapterIndex: number;
  removeChapter: Dispatch<SetStateAction<number[]>>;
  setChapterContents: Dispatch<
    SetStateAction<
      {
        title: string;
        order: number;
        lectures?: {
          title: string;
          description: string;
          isPreview: boolean;
          order: number;
          resources: { name: string; url: string }[];
        }[];
      }[]
    >
  >;
}

function ChapterCreation({
  chapters,
  chapterIndex,
  removeChapter,
  setChapterContents,
}: ChapterCreationProps) {
  const chapterByDB = useMemo(() => {
    return (
      chapters && chapters.find((chapter) => chapter.order === chapterIndex)
    );
  }, [chapters]);

  const [numberLecture, setNumberLecture] = useState<number[]>(() => {
    if (
      chapters &&
      chapterByDB &&
      chapterByDB.lectures &&
      chapterByDB.lectures.length > 0
    ) {
      return chapterByDB.lectures.map((lecture) => lecture.order);
    }

    return [1];
  });
  const [animationParent] = useAutoAnimate<HTMLDivElement>();
  const [shouldShowInput, setShouldShowInput] = useState(false);

  const [chapterTitle, setChapterTitle] = useState(() => {
    const chapterByDB =
      chapters && chapters.find((chapter) => chapter.order === chapterIndex);

    if (chapters && chapterByDB) {
      return chapterByDB.title;
    }

    return chapterIndex === 1 ? 'Giới thiệu' : '';
  });

  //hook update course values
  useEffect(() => {
    const payload = { title: chapterTitle, order: chapterIndex };
    setChapterContents((prevState) => {
      // create if non-exist
      if (
        prevState.length === 0 ||
        !prevState.find((chapter) => chapter.order === chapterIndex)
      ) {
        return [...prevState].concat(payload);
      }

      // update if exist
      return prevState.map((chapter) => {
        if (chapter.order === chapterIndex) {
          return payload;
        }
        return chapter;
      });
    });
  }, [chapterTitle]);

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
            onClick={() => {
              setChapterContents((prevState) => {
                return prevState.filter(
                  (chapter) => chapter.order !== chapterIndex,
                );
              });
              removeChapter((prev) => {
                return prev.filter((idx) => idx !== chapterIndex);
              });
            }}
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
              // setChapterContents={setChapterContents}
              lectures={chapterByDB?.lectures}
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
