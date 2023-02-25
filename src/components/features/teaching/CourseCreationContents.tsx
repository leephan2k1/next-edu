import { PlusIcon } from '@heroicons/react/24/outline';
import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';
import { lecturesContents } from '~/atoms/lecturesContents';
import useCourse from '~/contexts/CourseContext';
import type { CourseType } from '~/types';

import { useSetAtom } from 'jotai';
import { createCourseSteps } from '~/atoms/createCourseSteps';
import ChapterCreation from './ChapterCreation';

interface CourseCreationContentsProps {
  course?: CourseType | null;
}

export default function CourseCreationContents({
  course,
}: CourseCreationContentsProps) {
  const [numberChapter, setNumberChapter] = useState<number[]>(() => {
    if (course && course.chapters && course.chapters.length > 0) {
      return course.chapters.map((chapter) => chapter.order);
    }

    return [1];
  });

  const [chapterContents, setChapterContents] = useState<
    {
      title: string;
      order: number;
      lectures?: {
        title: string;
        description: string;
        isPreview: boolean;
        order: number;
        chapterOrder: number;
        resources: { name: string; url: string }[];
      }[];
    }[]
  >([]);

  const lecturesContentsValue = useAtomValue(lecturesContents);

  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const setStep = useSetAtom(createCourseSteps);
  const courseCtx = useCourse();

  useEffect(() => {
    if (!!entry?.isIntersecting) {
      setStep((prevStep) => ++prevStep);
    } else {
      setStep((prevStep) => (prevStep > 1 ? --prevStep : prevStep));
    }
  }, [entry]);

  useEffect(() => {
    // console.log('lecturesContentsValue trong effect:: ', lecturesContentsValue);
    // console.log('chapterContents::: ', chapterContents);

    chapterContents.forEach((chapter) => {
      const lectureByChapter = lecturesContentsValue
        .filter((lecture) => lecture.chapterOrder === chapter.order)
        .map((e) => ({
          title: e.title,
          description: e.description,
          isPreview: e.isPreview,
          order: e.order,
          resources: e.resources,
        }));

      chapter.lectures = [];

      Object.assign(chapter?.lectures, lectureByChapter);
    });

    courseCtx?.updateCourse({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      chapters: chapterContents,
    });
  }, [courseCtx?.dispatchUpdate, chapterContents]);

  return (
    <div className="mt-4 flex flex-col space-y-6">
      <h1 ref={ref} className="text-3xl">
        2. Thiết kế nội dung
      </h1>
      <p className="italic md:w-3/4">
        Một khoá học phải có ít nhất 1 chương, 1 bài học và 1 bài học xem trước
        công khai. Xem thêm phần{' '}
        <span className="text-rose-500">hướng dẫn</span> để biết thêm chi tiết!
      </p>

      {numberChapter.map((item) => {
        return (
          <ChapterCreation
            chapters={course?.chapters}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            setChapterContents={setChapterContents}
            removeChapter={setNumberChapter}
            chapterIndex={item}
            key={item}
          />
        );
      })}

      <button
        onClick={() =>
          setNumberChapter((prev) => {
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
        <span>Thêm chương</span>
      </button>
    </div>
  );
}
