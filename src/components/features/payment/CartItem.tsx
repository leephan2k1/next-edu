import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { MAPPING_LEVEL_LANGUAGE, PATHS } from '~/constants';
import { CourseType } from '~/types';
import { trpc } from '~/utils/trpc';

import { HeartIcon, TagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface CartItemProps {
  cartId: string;
  wishlistId: string | null;
  isFavorite?: boolean;
  course: CourseType;
  courseId: string;
  refetchData: () => void;
}

export default function CartItem({
  course,
  courseId,
  wishlistId,
  isFavorite,
  refetchData,
  cartId,
}: CartItemProps) {
  const { mutate: deleteCourseFromCart, status } =
    trpc.user.deleteCourseFromCart.useMutation();

  const { mutate: addWishCourse, status: addWishCourseStatus } =
    trpc.user.addWishCourse.useMutation();
  const { mutate: deleteWishCourse, status: deleteWishCourseStatus } =
    trpc.user.deleteWishCourse.useMutation();

  const totalLectures = useMemo(() => {
    if (!course) return 0;

    return course.chapters.reduce((acc, curr) => {
      if (!curr?.lectures) return acc;

      return acc + curr?.lectures?.length;
    }, 0);
  }, [course]);

  const handleDeleteCart = () => {
    deleteCourseFromCart({ cartId });
  };

  const handleAddOrRemoveToFvList = () => {
    if (isFavorite && wishlistId) {
      deleteWishCourse({ wishlistId });
    } else {
      addWishCourse({ courseId });
    }
  };

  useEffect(() => {
    if (
      (status === 'success' ||
        addWishCourseStatus === 'success' ||
        deleteWishCourseStatus === 'success') &&
      refetchData &&
      typeof refetchData === 'function'
    ) {
      refetchData();
    }

    if (status === 'error') {
      toast.error('Oops! Có lỗi xảy ra');
    }
  }, [status, addWishCourseStatus, deleteWishCourseStatus]);

  return (
    <li className="flex space-x-2 rounded-xl bg-white dark:bg-dark-background">
      <div className="w-[30%] p-2">
        <Link href={`/${PATHS.COURSE}/${course.slug}`}>
          <figure className="relative m-auto overflow-hidden rounded-xl pb-[56.25%] md:rounded-2xl">
            <Image
              alt="courser-thumbnail"
              src={course.thumbnail as string}
              fill
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            />

            <p className="absolute bottom-1 right-1 flex items-center justify-center  space-x-2 rounded-lg bg-rose-100 p-2 text-sm font-bold text-rose-700 md:text-xl">
              <TagIcon className="inline-block h-4 w-4" />
              <span>
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(course?.coursePrice || 0)}{' '}
              </span>
            </p>
          </figure>
        </Link>
      </div>

      <div className="flex flex-1 py-2 lg:py-4">
        <Link
          className="flex w-[80%] flex-col justify-between lg:w-[70%]"
          href={`/${PATHS.COURSE}/${course.slug}`}
        >
          <div className="flex flex-col space-y-0 lg:space-y-2">
            <h3 className="font-bold capitalize line-clamp-1 lg:line-clamp-2">
              {course.name}
            </h3>
            <h4 className="text-xl md:text-2xl">{course?.instructor?.name}</h4>
          </div>

          <div className="space-x-2 text-xl md:text-2xl">
            <span>{course?.chapters.length} chương •</span>
            <span>{totalLectures} bài học •</span>
            <span>
              {Object.keys(MAPPING_LEVEL_LANGUAGE).find(
                (key) => MAPPING_LEVEL_LANGUAGE[key] === course.courseLevel,
              )}
            </span>
          </div>
        </Link>

        <div className="flex flex-1 flex-col items-end justify-between p-2 lg:justify-evenly lg:p-4">
          <button
            onClick={handleDeleteCart}
            className="rounded-full p-2 hover:border hover:border-gray-600 dark:hover:border-white"
          >
            <XMarkIcon className="h-8 w-8" />
          </button>

          <button
            onClick={handleAddOrRemoveToFvList}
            className="rounded-full p-2 hover:border hover:border-gray-600 dark:hover:border-white"
          >
            {isFavorite ? (
              <HeartIconSolid className="h-8 w-8 text-rose-500" />
            ) : (
              <HeartIcon className="h-8 w-8" />
            )}
          </button>
        </div>
      </div>
    </li>
  );
}
