import { memo, useState, useEffect } from 'react';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useAutoAnimate } from '@formkit/auto-animate/react';

function Rating() {
  const [isOverflow, setIsOverflow] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [parent] = useAutoAnimate<HTMLParagraphElement>();

  useEffect(() => {
    parent.current && setIsOverflow(parent.current?.clientHeight > 100);
  }, []);

  return (
    <li className="flex min-h-[15rem] w-full flex-col items-center justify-center rounded-2xl bg-gray-800 px-4 py-2 text-white/60 dark:bg-white dark:text-gray-600">
      <div className="flex w-full">
        <figure className="relative h-[5rem] w-[5rem] overflow-hidden rounded-full">
          <Image
            alt="user-avatar"
            className="absolute bg-cover bg-center bg-no-repeat"
            fill
            src="https://placeimg.com/192/192/people"
          />
        </figure>
        <div className="flex flex-1 flex-col p-2">
          <h2 className="max-w-[40%] font-bold line-clamp-1">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. A,
            molestiae exercitationem modi consequatur repellendus delectus vitae
            labore quisquam iste, tenetur corrupti autem! Alias reprehenderit
            velit nostrum aliquid. Iusto, quo asperiores?
          </h2>

          <div className="flex items-center space-x-4">
            <div className="flex">
              <StarIcon className="h-4 w-4 text-yellow-500" />
              <StarIcon className="h-4 w-4 text-yellow-500" />
              <StarIcon className="h-4 w-4 text-yellow-500" />
              <StarIcon className="h-4 w-4 text-yellow-500" />
              <StarIcon className="h-4 w-4 text-yellow-500" />
            </div>
            <span className="text-xl">1 tuần trước</span>
          </div>
        </div>
      </div>

      <div className={`flex flex-col p-2`}>
        <p
          ref={parent}
          className={`relative z-10 font-light ${isOverflow && 'pb-16'} ${
            showMore ? '' : 'line-clamp-5'
          }`}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus,
          {isOverflow && (
            <button
              onClick={() => setShowMore((prevState) => !prevState)}
              className="smooth-effect glass absolute bottom-0 left-1/2 z-30 mx-auto flex w-full -translate-x-1/2 items-center justify-center space-x-2 rounded-lg py-2"
            >
              <span>{showMore ? 'Thu gọn' : 'Xem thêm'}</span>{' '}
              <ChevronDownIcon
                className={`h-6 w-6 ${showMore ? 'rotate-180 transform' : ''}`}
              />
            </button>
          )}
        </p>
      </div>
    </li>
  );
}

export default memo(Rating);
