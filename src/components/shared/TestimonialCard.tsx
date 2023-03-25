import { SparklesIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { memo } from 'react';
import { BsStarFill } from 'react-icons/bs';
import type { Review } from '@prisma/client';
import PublicLinkProfile from './PublicLinkProfile';

interface TestimonialCardProps {
  review: Review;
}

function TestimonialCard({ review }: TestimonialCardProps) {
  return (
    <div className="aspect-w-4 aspect-h-2">
      <div className="full-size flex items-center overflow-hidden rounded-2xl border-2 border-gray-600 bg-primary dark:border-white/50">
        {/* info owner comment  */}
        <div className="flex h-full w-[40%] flex-col justify-around">
          <div className="flex flex-col">
            {/* user avatar  */}
            <div className="flex items-center justify-around p-4">
              <div className="avatar">
                <div className="relative w-24 rounded-full">
                  <PublicLinkProfile userId={String(review?.author?.id)}>
                    <Image
                      alt="user-avtatar"
                      className="absolute bg-cover bg-center bg-no-repeat"
                      fill
                      src={review?.author?.image || ''}
                    />
                  </PublicLinkProfile>
                </div>
              </div>

              <SparklesIcon className="h-16 w-16 md:h-20 md:w-20" />
            </div>
            {/* user info  */}
            <h3 className="px-6 font-bold line-clamp-2">
              <PublicLinkProfile userId={String(review?.author?.id)}>
                {review?.author?.name}
              </PublicLinkProfile>
            </h3>
          </div>

          {/* rating  */}
          <div className="flex flex-1 items-center justify-center space-x-2 px-6">
            <span>{review.rating}</span>
            {Array.from(new Array(review.rating).keys()).map((e) => {
              return <BsStarFill key={e} className="h-5 w-5 text-white" />;
            })}
          </div>
        </div>

        <hr className="my-auto mx-2 h-4/5 w-[2px] bg-gray-400" />

        {/* comment content  */}
        <div className="my-ato absolute-center h-4/5 w-[60%]">
          <p className="px-2 line-clamp-5 lg:line-clamp-6">{review.content}</p>
        </div>
      </div>
    </div>
  );
}

export default memo(TestimonialCard);
