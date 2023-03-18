import { memo, useState, useEffect } from 'react';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Review } from '@prisma/client';
import { TrashIcon } from '@heroicons/react/20/solid';
import { useSession } from 'next-auth/react';
import { trpc } from '~/utils/trpc';
import toast from 'react-hot-toast';
import { MdOutlineSettingsBackupRestore } from 'react-icons/md';

interface RatingProps {
  review: Review;
  refetchAllReviews: () => void;
}

function Rating({ review, refetchAllReviews }: RatingProps) {
  const { data: session } = useSession();

  const [isOverflow, setIsOverflow] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [parent] = useAutoAnimate<HTMLParagraphElement>();

  useEffect(() => {
    parent.current && setIsOverflow(parent.current?.clientHeight > 100);
  }, []);

  const { mutate, status } = trpc.user.deleteRating.useMutation();

  const handleDeleteRating = () => {
    const cf = window.confirm('Xác nhận xoá?');

    if (cf) {
      mutate({ ratingId: review.id });
    }
  };

  useEffect(() => {
    if (status === 'success') {
      toast.success('Xoá đánh giá thành công!');
      refetchAllReviews();
    }

    if (status === 'error') {
      toast.error('Có lỗi, thử lại sau!');
    }
  }, [status]);

  return (
    <li className="flex min-h-[15rem] w-full flex-col items-center justify-center rounded-2xl bg-light-background px-4 py-2 dark:bg-black">
      <div className="flex w-full space-x-4">
        <figure className="relative h-[5rem] w-[5rem] overflow-hidden rounded-full">
          <Image
            alt="user-avatar"
            className="absolute bg-cover bg-center bg-no-repeat"
            fill
            src={review?.author?.image || ''}
          />
        </figure>

        <div className="flex flex-1 justify-between p-2">
          <div className="flex w-full flex-col">
            <h2 className="max-w-[40%] font-bold line-clamp-1">
              {review?.author?.name}
            </h2>

            <div className="flex items-center space-x-4">
              <div className="flex">
                {Array.from(new Array(review.rating).keys()).map((e) => {
                  return (
                    <StarIcon className="h-4 w-4 text-yellow-500" key={e} />
                  );
                })}
              </div>
              <span className="text-xl">
                {new Date(review.createdAt).toLocaleDateString('vi-VI')}
              </span>
            </div>
          </div>
          {session?.user?.id === review?.author?.id && (
            <button onClick={handleDeleteRating} className="p-2">
              <TrashIcon className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>

      <div className={`mt-2 flex w-full flex-col p-2`}>
        <p
          ref={parent}
          className={`relative z-10 font-light ${isOverflow && 'pb-16'} ${
            showMore ? '' : 'line-clamp-5'
          }`}
        >
          {review.content}
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
