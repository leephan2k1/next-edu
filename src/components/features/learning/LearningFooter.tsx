import { useSetAtom } from 'jotai';
import { courseContentBarState } from '~/atoms/courseContentBarState';

import {
  Bars3Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

export default function LearningFooter() {
  const setCourseContentsBarOpen = useSetAtom(courseContentBarState);

  return (
    <div className="fixed bottom-0 left-0 w-screen lg:hidden">
      <div className="flex w-full items-center justify-between py-6 px-4 md:px-6 md:py-8">
        <div className="flex w-fit max-w-[25%] items-center space-x-4 md:max-w-[40%]">
          <button
            onClick={() => setCourseContentsBarOpen(true)}
            className="btn-follow-theme btn-circle btn"
          >
            <Bars3Icon className="h-8 w-8" />
          </button>
          <h2 className="text-lg line-clamp-1 md:text-xl">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus
            pariatur at provident dolor odio qui veniam animi voluptates
            laboriosam nobis dignissimos, quam dolorem amet molestiae commodi
            inventore nostrum magnam doloremque?
          </h2>
        </div>

        <div className="flex space-x-4">
          <button className="absolute-center flex-nowrap space-x-2 px-4 py-2">
            <ChevronLeftIcon className="h-8 w-8" />
            <span>Bài trước</span>
          </button>
          <button className="absolute-center flex-nowrap space-x-2 rounded-xl border border-primary px-4 py-2 text-yellow-600">
            <span>Bài tiếp theo</span>
            <ChevronRightIcon className="h-8 w-8" />
          </button>
        </div>
      </div>
    </div>
  );
}
