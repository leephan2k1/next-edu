import { memo } from 'react';
import LearningVideo from './LearningVideo';

function LearningBody() {
  return (
    <div className="flex min-h-[1500px] w-full bg-red-500/0 md:py-4">
      <LearningVideo />
    </div>
  );
}

export default memo(LearningBody);
