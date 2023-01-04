import { memo } from 'react';
import Rating from './Rating';

function RatingList() {
  return (
    <div className="w-full">
      <ul className="flex flex-col space-y-4">
        <Rating />
        <Rating />
        <Rating />
        <Rating />
        <Rating />
        <Rating />
        <Rating />
        <Rating />
      </ul>
    </div>
  );
}

export default memo(RatingList);
