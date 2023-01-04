import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { memo } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

function PercentRating() {
  return (
    <>
      <div className="flex items-center">
        <progress
          className="progress progress-info w-56"
          value="60"
          max="100"
        ></progress>
        <StarIcon className="h-4 w-4 text-yellow-500" />
        <StarIcon className="h-4 w-4 text-yellow-500" />
        <StarIcon className="h-4 w-4 text-yellow-500" />
        <StarIcon className="h-4 w-4 text-yellow-500" />
        <StarIcon className="h-4 w-4 text-yellow-500" />
        <span className="mx-2 text-xl">66%</span>
      </div>
      <div className="flex items-center">
        <progress
          className="progress progress-info w-56"
          value="60"
          max="100"
        ></progress>
        <StarIcon className="h-4 w-4 text-yellow-500" />
        <StarIcon className="h-4 w-4 text-yellow-500" />
        <StarIcon className="h-4 w-4 text-yellow-500" />
        <StarIcon className="h-4 w-4 text-yellow-500" />
        <StarIconOutline className="h-4 w-4 text-yellow-500" />
        <span className="mx-2 text-xl">66%</span>
      </div>
      <div className="flex items-center">
        <progress
          className="progress progress-info w-56"
          value="60"
          max="100"
        ></progress>
        <StarIcon className="h-4 w-4 text-yellow-500" />
        <StarIcon className="h-4 w-4 text-yellow-500" />
        <StarIcon className="h-4 w-4 text-yellow-500" />
        <StarIconOutline className="h-4 w-4 text-yellow-500" />
        <StarIconOutline className="h-4 w-4 text-yellow-500" />
        <span className="mx-2 text-xl">66%</span>
      </div>
      <div className="flex items-center">
        <progress
          className="progress progress-info w-56"
          value="60"
          max="100"
        ></progress>
        <StarIcon className="h-4 w-4 text-yellow-500" />
        <StarIcon className="h-4 w-4 text-yellow-500" />
        <StarIconOutline className="h-4 w-4 text-yellow-500" />
        <StarIconOutline className="h-4 w-4 text-yellow-500" />
        <StarIconOutline className="h-4 w-4 text-yellow-500" />
        <span className="mx-2 text-xl">66%</span>
      </div>
      <div className="flex items-center">
        <progress
          className="progress progress-info w-56"
          value="80"
          max="100"
        ></progress>
        <StarIcon className="h-4 w-4 text-yellow-500" />
        <StarIconOutline className="h-4 w-4 text-yellow-500" />
        <StarIconOutline className="h-4 w-4 text-yellow-500" />
        <StarIconOutline className="h-4 w-4 text-yellow-500" />
        <StarIconOutline className="h-4 w-4 text-yellow-500" />
        <span className="mx-2 text-xl">66%</span>
      </div>
    </>
  );
}

export default memo(PercentRating);
