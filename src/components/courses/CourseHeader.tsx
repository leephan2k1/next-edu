import {
  ClockIcon,
  HeartIcon,
  StarIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { BsStarFill } from 'react-icons/bs';
import { Else, If, Then } from 'react-if';
import { PATHS } from '~/constants';
import useIsAddToCart from '~/hooks/useIsAddToCart';

import Loading from '../buttons/Loading';
import Breadcrumbs from '../shared/Breadcrumbs';

import type { Wishlist } from '@prisma/client';
import type { ReactNode } from 'react';
import useCart from '~/contexts/CartContext';
import type { CourseType } from '~/types';
import useIsEnrolled from '~/hooks/useIsEnrolled';
import { useSession } from 'next-auth/react';

interface CourseHeaderProps {
  course?: CourseType;
  ratingValue: number;
  children: ReactNode;

  isLoading?: boolean;
  handleAddWishCourse: () => void;
  handleDeleteWishCourse: (wishlistId: string) => void;
  wishlist: Wishlist[];
}

export default function CourseHeader({
  children,
  course,
  ratingValue,
  wishlist,
  handleAddWishCourse,
  isLoading,
  handleDeleteWishCourse,
}: CourseHeaderProps) {
  const cartCtx = useCart();
  const router = useRouter();
  const isAddToCart = useIsAddToCart({ course });

  const isEnrolled = useIsEnrolled({ course });

  const { status: sessionStatus } = useSession();

  const wishlistItem = useMemo(() => {
    if (course && wishlist) {
      return wishlist.find((fvCourse) => fvCourse.courseId === course?.id);
    }

    return null;
  }, [course, wishlist]);

  const handleAddCourseToCart = () => {
    if (sessionStatus === 'unauthenticated' && !cartCtx?.userWithCart) {
      router.push(`/${PATHS.LOGIN}`);
      return;
    }

    if (
      !course ||
      !cartCtx?.userWithCart ||
      cartCtx?.addCourseToCartStatus === 'loading'
    )
      return;

    if (isAddToCart) {
      router.push(`/${PATHS.CART}`);
      return;
    }

    cartCtx?.addCourseToCart(course.id);
  };

  return (
    <div className="relative w-full bg-white py-10 text-gray-600 dark:bg-dark-background dark:text-white/60 lg:px-6 lg:py-6">
      <div className="mx-auto flex w-full flex-col items-center  md:max-w-[720px] lg:max-w-[1200px] lg:flex-row lg:items-start lg:justify-center">
        <div className="my-auto flex flex-col items-center space-y-6 md:max-w-[80%] lg:min-w-[70rem] lg:max-w-[70%] lg:items-start">
          {course ? (
            <Breadcrumbs
              category={course.category.name}
              subCategory={course.subCategory as string}
            />
          ) : (
            <div className="h-[3rem] w-3/4 animate-pulse rounded-2xl bg-gray-300 dark:bg-gray-700"></div>
          )}

          {/* demo thumbnail  */}
          <div className="w-[80%] lg:hidden">
            <div
              className={`relative overflow-hidden rounded-2xl  pb-[56.25%] ${
                !course && 'animate-pulse bg-gray-300 dark:bg-gray-700'
              }`}
            >
              {course && (
                <Image
                  className="absolute inset-0 bg-center bg-no-repeat"
                  fill
                  alt="course-thumbnail"
                  src={course.thumbnail as string}
                />
              )}
            </div>
          </div>

          <div className="flex min-w-[33.2rem] max-w-[70%] flex-col space-y-6">
            {course ? (
              <h1 className="text-4xl font-semibold lg:text-5xl">
                {course.name}
              </h1>
            ) : (
              <div className="h-[5rem] w-full animate-pulse rounded-2xl bg-gray-300 dark:bg-gray-700"></div>
            )}

            {course ? (
              <h2 className="text-2xl lg:text-3xl">
                {course.briefDescription}
              </h2>
            ) : (
              <div className="mx-auto h-[10rem] w-3/4 animate-pulse rounded-2xl bg-gray-300 dark:bg-gray-700 lg:mx-0"></div>
            )}

            {course ? (
              <div className="flex flex-col items-start md:flex-row md:items-center md:space-x-4">
                <div className="flex items-center space-x-4">
                  <span className="inline-block">{ratingValue}</span>

                  <div className="flex space-x-2">
                    {Array.from(new Array(ratingValue).keys()).map((elem) => {
                      return (
                        <BsStarFill
                          key={elem}
                          className="h-5 w-5 text-yellow-500"
                        />
                      );
                    })}
                    {Array.from(new Array(5 - ratingValue).keys()).map(
                      (elem) => {
                        return (
                          <StarIcon
                            key={elem}
                            className="h-5 w-5 text-gray-500 dark:text-white"
                          />
                        );
                      },
                    )}
                  </div>
                </div>

                <div className="flex">
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  <span>({course.reviews.length} đánh giá)</span>
                  <span className="mx-2">|</span>
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  <span>{course.students.length} học sinh</span>
                </div>
              </div>
            ) : (
              <div className="h-[4rem] w-full animate-pulse rounded-2xl bg-gray-300 dark:bg-gray-700"></div>
            )}

            <h3 className="flex items-center md:space-x-2">
              <UserIcon className="hidden h-6 w-6 md:inline-block" />
              <span>Người hướng dẫn: </span>
              {course ? (
                <Link
                  className="text-blue-500"
                  href={`/${PATHS.USER}/${course.instructor.id}`}
                >
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  {course.instructor.name}
                </Link>
              ) : (
                <div className="h-[2rem] w-1/2 animate-pulse rounded-xl bg-gray-300 dark:bg-gray-700"></div>
              )}
            </h3>

            <h5 className="flex items-center space-x-2">
              <ClockIcon className="h-6 w-6" />{' '}
              <span className="flex">
                Cập nhật lần cuối:{' '}
                {course &&
                  new Date(course.updatedAt).toLocaleDateString('vi-VI')}
              </span>
              {!course && (
                <div className="h-[2rem] w-1/2 animate-pulse rounded-xl bg-gray-300 dark:bg-gray-700"></div>
              )}
            </h5>
          </div>

          <div className="mx-auto flex w-[70%] space-x-6 lg:hidden">
            {course && Number(course.coursePrice) > 0 && !isEnrolled && (
              <button
                onClick={handleAddCourseToCart}
                disabled={!course}
                className="absolute-center btn-primary btn-lg btn w-[80%] grow"
              >
                <If condition={cartCtx?.addCourseToCartStatus === 'loading'}>
                  <Then>
                    <Loading />
                  </Then>
                  <Else>
                    {isAddToCart ? 'Đi đến giỏ hàng' : 'Thêm vào giỏ hàng'}
                  </Else>
                </If>
              </button>
            )}

            <button
              onClick={() => {
                if (isLoading) return; //bc btn styles :b

                if (!wishlistItem) {
                  handleAddWishCourse();
                } else {
                  handleDeleteWishCourse(wishlistItem.id);
                }
              }}
              className="btn-ghost btn-active btn-lg btn flex-1 text-gray-600 dark:text-white/60"
            >
              <If condition={isLoading}>
                <Then>
                  <Loading />
                </Then>
                <Else>
                  {!!wishlistItem ? (
                    <HeartIconSolid className="h-8 w-8 text-rose-500 animate-in zoom-in" />
                  ) : (
                    <HeartIcon className="h-8 w-8 animate-in zoom-in" />
                  )}
                </Else>
              </If>
            </button>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
