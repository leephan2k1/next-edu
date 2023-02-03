import ChapterCreation from './ChapterCreation';
import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function CourseCreationContents() {
  const [numberChapter, setNumberChapter] = useState<number[]>([1]);

  return (
    <div className="mt-4 flex flex-col space-y-6">
      <h1 className="text-3xl">2. Thiết kế nội dung</h1>

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
