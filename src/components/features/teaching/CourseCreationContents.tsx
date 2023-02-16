import { useRef, useState, useEffect, memo } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

import { PlusIcon } from '@heroicons/react/24/outline';

import ChapterCreation from './ChapterCreation';
import { createCourseSteps } from '~/atoms/createCourseSteps';
import { useSetAtom } from 'jotai';

function CourseCreationContents() {
  const [numberChapter, setNumberChapter] = useState<number[]>([1]);
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const setStep = useSetAtom(createCourseSteps);

  useEffect(() => {
    if (!!entry?.isIntersecting) {
      setStep((prevStep) => ++prevStep);
    } else {
      setStep((prevStep) => (prevStep > 1 ? --prevStep : prevStep));
    }
  }, [entry]);

  return (
    <div className="mt-4 flex flex-col space-y-6">
      <h1 ref={ref} className="text-3xl">
        2. Thiết kế nội dung
      </h1>
      <p className="italic md:w-3/4">
        Một khoá học phải có ít nhất 1 chương, 1 bài học và 1 bài học xem trước
        công khai. Xem thêm phần trách nhiệm để biết thêm chi tiết!
      </p>

      {numberChapter.map((item) => {
        return (
          <ChapterCreation
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

export default memo(CourseCreationContents);
