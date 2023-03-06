import { useState, useEffect } from 'react';
import DiscussStandalone from '../features/discussion/DiscussStandalone';
import { trpc } from '~/utils/trpc';
import toast from 'react-hot-toast';

interface CourseRatingProps {
  courseId?: string;
}

export default function CourseRating({ courseId }: CourseRatingProps) {
  const [ratings, setRating] = useState<{ rating: number; checked: boolean }[]>(
    [
      { rating: 1, checked: false },
      { rating: 2, checked: false },
      { rating: 3, checked: false },
      { rating: 4, checked: false },
      { rating: 5, checked: true },
    ],
  );

  const { mutate, status } = trpc.user.addRating.useMutation();

  const handleSubmit = (content: string) => {
    if (content.replace(/<\/?[^>]+(>|$)/g, '').length < 3) {
      toast.error('Cần ít nhất 3 ký tự');
      return;
    }

    if (!courseId) {
      toast.error('Có lỗi xảy ra, thử lại sau!');
      return;
    }

    mutate({
      content,
      courseId,
      rating: ratings.find((rt) => rt.checked)?.rating || 5,
    });
  };

  useEffect(() => {
    if (status === 'success') {
      toast.success('Đánh giá thành công!');
    }

    if (status === 'error') {
      toast.error('Có lỗi xảy ra, thử lại sau!');
    }
  }, [status]);

  return (
    <div className="mx-auto w-full lg:w-[70%]">
      <h1 className="mb-6 text-2xl font-semibold md:text-3xl">
        Đánh giá khoá học
      </h1>

      <div className="mb-6 flex w-full justify-end">
        <div className="rating rating-lg space-x-2 lg:rating-md">
          {ratings &&
            ratings.length > 0 &&
            ratings.map((rating) => {
              return (
                <input
                  key={rating.rating}
                  checked={rating.checked}
                  onClick={() => {
                    setRating((ratings) => {
                      const newState = ratings.map((rt) => ({
                        ...rt,
                        checked: false,
                      }));

                      return newState.map((rt) => {
                        if (rt.rating === rating.rating) {
                          return { ...rating, checked: true };
                        }

                        return rt;
                      });
                    });
                  }}
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                />
              );
            })}
        </div>
      </div>

      <DiscussStandalone
        inputType="comment"
        customSubmit={handleSubmit}
        customStatus={status}
      />
    </div>
  );
}
