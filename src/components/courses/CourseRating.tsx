import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { trpc } from '~/utils/trpc';
import Loading from '../buttons/Loading';

interface CourseRatingProps {
  courseId?: string;
  refetchCourse: () => void;
}

export default function CourseRating({
  courseId,
  refetchCourse,
}: CourseRatingProps) {
  const { data: session } = useSession();
  const [value, setValue] = useState('');
  const [ratings, setRating] = useState<{ rating: number; checked: boolean }[]>(
    [
      { rating: 1, checked: false },
      { rating: 2, checked: false },
      { rating: 3, checked: false },
      { rating: 4, checked: false },
      { rating: 5, checked: true },
    ],
  );

  const inputRef = useRef<HTMLInputElement | null>(null);

  const { mutate, status } = trpc.user.addRating.useMutation();

  const handleSubmit = (content: string) => {
    if (content.trim().length < 3) {
      toast.error('Cần ít nhất 3 ký tự');
      return;
    }

    if (content.trim().length > 150) {
      toast.error('Giới hạn 150 ký tự');
      return;
    }

    if (!courseId) {
      toast.error('Có lỗi xảy ra, thử lại sau!');
      return;
    }

    mutate({
      content: content.trim(),
      courseId,
      rating: ratings.find((rt) => rt.checked)?.rating || 5,
    });
  };

  useEffect(() => {
    if (status === 'success') {
      toast.success('Đánh giá thành công!');
      refetchCourse();
      setValue('');
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

      <div className="flex space-x-4">
        <figure className="relative h-[6rem] min-h-[6rem] w-[6rem] min-w-[6rem] overflow-hidden rounded-full">
          <Image
            src={session?.user?.image || ''}
            alt="user-avatar"
            fill
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          />
        </figure>

        <input
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          ref={inputRef}
          type="text"
          className="flex-1 rounded-xl px-4"
        />
      </div>

      <div className="mt-4 flex w-full justify-end">
        <button
          disabled={status === 'loading'}
          onClick={() => {
            handleSubmit(value);
          }}
          className="absolute-center min-h-[3.9rem] w-fit min-w-[8.4rem] rounded-xl bg-yellow-200 px-4 py-3 text-gray-600"
        >
          {status === 'loading' ? <Loading /> : 'Đánh giá'}
        </button>
      </div>
    </div>
  );
}
