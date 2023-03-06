import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { memo } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

interface PercentRatingProps {
  fiveStars?: number;
  fourStars?: number;
  threeStars?: number;
  twoStars?: number;
  oneStar?: number;
}

function PercentRating({
  fiveStars,
  fourStars,
  oneStar,
  threeStars,
  twoStars,
}: PercentRatingProps) {
  return (
    <>
      <div className="flex items-center">
        <progress
          className="smooth-effect progress progress-info w-56"
          value={fiveStars}
          max="100"
        ></progress>
        <StarIcon className="h-4 w-4 text-yellow-500" />
        <StarIcon className="h-4 w-4 text-yellow-500" />
        <StarIcon className="h-4 w-4 text-yellow-500" />
        <StarIcon className="h-4 w-4 text-yellow-500" />
        <StarIcon className="h-4 w-4 text-yellow-500" />
        <span className="mx-2 text-xl">{fiveStars}%</span>
      </div>
      <div className="flex items-center">
        <progress
          className="smooth-effect progress progress-info w-56"
          value={fourStars}
          max="100"
        ></progress>
        <StarIcon className="h-4 w-4 text-yellow-500" />
        <StarIcon className="h-4 w-4 text-yellow-500" />
        <StarIcon className="h-4 w-4 text-yellow-500" />
        <StarIcon className="h-4 w-4 text-yellow-500" />
        <StarIconOutline className="h-4 w-4 text-yellow-500" />
        <span className="mx-2 text-xl">{fourStars}%</span>
      </div>
      <div className="flex items-center">
        <progress
          className="smooth-effect progress progress-info w-56"
          value={threeStars}
          max="100"
        ></progress>
        <StarIcon className="h-4 w-4 text-yellow-500" />
        <StarIcon className="h-4 w-4 text-yellow-500" />
        <StarIcon className="h-4 w-4 text-yellow-500" />
        <StarIconOutline className="h-4 w-4 text-yellow-500" />
        <StarIconOutline className="h-4 w-4 text-yellow-500" />
        <span className="mx-2 text-xl">{threeStars}%</span>
      </div>
      <div className="flex items-center">
        <progress
          className="smooth-effect progress progress-info w-56"
          value={twoStars}
          max="100"
        ></progress>
        <StarIcon className="h-4 w-4 text-yellow-500" />
        <StarIcon className="h-4 w-4 text-yellow-500" />
        <StarIconOutline className="h-4 w-4 text-yellow-500" />
        <StarIconOutline className="h-4 w-4 text-yellow-500" />
        <StarIconOutline className="h-4 w-4 text-yellow-500" />
        <span className="mx-2 text-xl">{twoStars}%</span>
      </div>
      <div className="flex items-center">
        <progress
          className="progress progress-info w-56"
          value={oneStar}
          max="100"
        ></progress>
        <StarIcon className="smooth-effect h-4 w-4 text-yellow-500" />
        <StarIconOutline className="h-4 w-4 text-yellow-500" />
        <StarIconOutline className="h-4 w-4 text-yellow-500" />
        <StarIconOutline className="h-4 w-4 text-yellow-500" />
        <StarIconOutline className="h-4 w-4 text-yellow-500" />
        <span className="mx-2 text-xl">{oneStar}%</span>
      </div>
    </>
  );
}

export default memo(PercentRating);
