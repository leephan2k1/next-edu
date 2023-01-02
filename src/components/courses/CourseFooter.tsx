import { memo } from 'react';
import InstructorsInfo from './InstructorsInfo';

function CourseFooter() {
  return (
    <div className="my-16 w-full text-gray-600 dark:text-white/80">
      <div className="mx-auto flex w-full flex-col space-y-14 px-4 md:max-w-[720px] lg:max-w-[1200px]">
        <InstructorsInfo />
      </div>
    </div>
  );
}

export default memo(CourseFooter);
