import { memo } from 'react';
import LearningVideo from './LearningVideo';
import LearningControlBar from './LearningControlBar';
import LearningFooter from './LearningFooter';

function LearningBody() {
  return (
    <div className="flex min-h-[1500px] w-full bg-red-500/0 text-gray-600 dark:text-white/80 md:py-4">
      <div className="full-size flex flex-col">
        <LearningVideo />

        <LearningControlBar />

        <LearningFooter />
      </div>
    </div>
  );
}

export default memo(LearningBody);
