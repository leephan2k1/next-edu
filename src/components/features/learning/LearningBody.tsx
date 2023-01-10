import { memo } from 'react';

import BodyOptions from './BodyOptions';
import LearningFooter from './LearningFooter';
import LearningVideo from './LearningVideo';

function LearningBody() {
  return (
    <div className="flex w-full bg-red-500/0 text-gray-600 dark:text-white/80 md:py-4">
      <div className="full-size flex flex-col">
        <LearningVideo />

        <BodyOptions />

        <LearningFooter />
      </div>
    </div>
  );
}

export default memo(LearningBody);
