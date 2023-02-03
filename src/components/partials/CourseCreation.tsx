import { useSetAtom } from 'jotai';
import { teachingSections } from '~/atoms/teachingSections';

import { PencilIcon } from '@heroicons/react/24/outline';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import CourseCreationInfo from '../features/teaching/CourseCreationInfo';

export default function CourseCreation() {
  const setSection = useSetAtom(teachingSections);

  return (
    <div className="flex min-h-screen flex-col space-y-14 pt-[7rem] pb-[5rem] md:pt-[5rem]">
      <div className="md:w-[80% mx-auto flex w-[90%] flex-col">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="mb-10 flex items-center space-x-4 text-3xl">
            <PencilIcon className="h-8 w-8" />{' '}
            <span className="font-bold">Thiết kế khoá học</span>
          </h1>

          <button
            onClick={() => setSection('CourseSummary')}
            className="smooth-effect flex w-fit items-center space-x-2 rounded-xl bg-yellow-400 px-4 py-3 text-gray-600"
          >
            <span>Trở về</span>
            <ArrowUturnLeftIcon className="h-8 w-8" />
          </button>
        </div>

        <ul className="steps sticky top-0 mx-auto mb-4 w-full gap-x-4 overflow-x-scroll rounded-xl bg-white dark:bg-dark-background">
          <li className="step-primary step">Thông tin cơ bản</li>
          <li className="step">Thiết kế nội dung</li>
          <li className="step">Phát hành khoá học</li>
        </ul>

        <CourseCreationInfo />
      </div>
    </div>
  );
}
