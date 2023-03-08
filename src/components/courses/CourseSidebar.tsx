import { useSetAtom } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { memo, useEffect, useMemo, useRef } from 'react';
import { BiInfinite } from 'react-icons/bi';
import { Else, If, Then } from 'react-if';
import { useIntersectionObserver } from 'usehooks-ts';
import { courseSidebarInViewport } from '~/atoms/courseSidebarAtom';
import { PATHS } from '~/constants';
import useCourse from '~/contexts/CourseContext';
import useIsEnrolled from '~/hooks/useIsEnrolled';

import {
  BookOpenIcon,
  FolderArrowDownIcon,
  HeartIcon,
  PlayCircleIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

import Loading from '../buttons/Loading';

import type { Wishlist } from '@prisma/client';

import useCart from '~/contexts/CartContext';
import useIsAddToCart from '~/hooks/useIsAddToCart';
import type { CourseType } from '~/types';
interface CourseSidebarProps {
  course?: CourseType;
  totalVideoDuration: number;
  totalLectures: number;

  isLoading?: boolean;
  handleAddWishCourse: () => void;
  handleDeleteWishCourse: (wishlistId: string) => void;
  wishlist: Wishlist[];
}

function CourseSidebar({
  course,
  totalVideoDuration,
  totalLectures,
  wishlist,
  handleAddWishCourse,
  isLoading,
  handleDeleteWishCourse,
}: CourseSidebarProps) {
  const refBtn = useRef<HTMLButtonElement | null>(null);
  const setSidebarState = useSetAtom(courseSidebarInViewport);
  const entry = useIntersectionObserver(refBtn, {});
  const router = useRouter();

  const courseCtx = useCourse();
  const cartCtx = useCart();

  const isEnrolled = useIsEnrolled({ course });
  const isAddToCart = useIsAddToCart({ course });

  useEffect(() => {
    setSidebarState(!!entry?.isIntersecting);
  }, [entry?.isIntersecting]);

  const wishlistItem = useMemo(() => {
    if (course && wishlist) {
      return wishlist.find((fvCourse) => fvCourse.courseId === course?.id);
    }

    return null;
  }, [course, wishlist]);

  const totalDownloadableResource = useMemo(() => {
    if (course) {
      return course.chapters.reduce((prev, curr) => {
        return (
          prev +
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          curr.lectures?.reduce((time, lecture) => {
            return (
              time +
              lecture.resources.reduce((videoDur, rsc) => {
                if (rsc.type === 'document') {
                  return videoDur + 1;
                }

                return videoDur + 0;
              }, 0)
            );
          }, 0)
        );
      }, 0);
    }

    return 0;
  }, [course]);

  const handleEnrollCourse = () => {
    if (
      isEnrolled &&
      course?.chapters &&
      course?.chapters.length > 0 &&
      course?.chapters[0]?.lectures
    ) {
      router.push(
        `/${PATHS.LEARNING}/${course?.slug}/${course?.chapters[0]?.lectures[0]?.id}`,
      );
      return;
    }

    if (!isAddToCart && course) {
      router.push(`/${PATHS.CART}`);
      cartCtx?.addCourseToCart(course.id);
      return;
    }

    if (!isEnrolled && isAddToCart) {
      router.push(`/${PATHS.CART}`);
      return;
    }

    if (course?.slug) {
      courseCtx?.enrollCourse(course.slug);
    }
  };

  const handleAddCourseToCart = () => {
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
    <aside
      className={`glass hidden h-[80vh] max-w-[30rem] flex-1 space-y-8 overflow-hidden rounded-2xl text-gray-600 dark:text-white/60 lg:block`}
    >
      <div className="w-full">
        <div
          className={`relative overflow-hidden rounded-2xl  pb-[56.25%] ${
            !course && 'm-2 animate-pulse bg-gray-300 dark:bg-gray-700'
          }`}
        >
          {course && (
            <Image
              className="absolute inset-0 bg-center bg-no-repeat"
              fill
              alt="course-thumbnail"
              src={course.thumbnail || ''}
            />
          )}
        </div>
      </div>

      {course ? (
        <h1 className="px-6 text-4xl font-bold">
          {course.coursePrice === 0
            ? 'Miễn phí'
            : new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(course.coursePrice as number)}
        </h1>
      ) : (
        <div className="ml-6 h-[4rem] w-2/3 animate-pulse rounded-xl bg-gray-300 dark:bg-gray-700"></div>
      )}

      <div className="flex w-full space-x-4 px-4">
        {course && Number(course.coursePrice) > 0 && !isEnrolled && (
          <button
            onClick={handleAddCourseToCart}
            disabled={!course}
            className="absolute-center btn-primary btn-lg btn w-[70%]"
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
          disabled={!course}
          onClick={() => {
            if (isLoading) return; //bc btn styles :b

            if (!wishlistItem) {
              handleAddWishCourse();
            } else {
              handleDeleteWishCourse(wishlistItem.id);
            }
          }}
          className="btn-active btn-ghost btn-lg btn flex-1 text-gray-600 dark:text-white/60"
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

      <div className="flex w-full space-x-4 px-4">
        <button
          disabled={courseCtx?.enrollStatus === 'loading' || !course}
          onClick={handleEnrollCourse}
          ref={refBtn}
          className="smooth-effect absolute-center min-h-[4rem] w-full rounded-xl border border-gray-600 p-3 uppercase hover:bg-white dark:border-white/60 dark:hover:bg-dark-background"
        >
          <If condition={!isEnrolled}>
            <Then>
              {courseCtx?.enrollStatus === 'loading' ? (
                <Loading />
              ) : course && Number(course.coursePrice) > 0 ? (
                'Mua ngay'
              ) : (
                'Đăng ký học'
              )}
            </Then>
            <Else>{'Học ngay'}</Else>
          </If>
        </button>
      </div>

      <div className="flex w-full flex-col space-y-2 px-4">
        <h1 className="text-2xl font-semibold">Khoá học này bao gồm:</h1>
        <ul className="flex flex-col space-y-4">
          <li className="flex items-center space-x-2">
            {course ? (
              <>
                <PlayCircleIcon className="h-6 w-6" />{' '}
                <span>
                  {Math.floor(totalVideoDuration / 3600) > 0
                    ? `${Math.floor(totalVideoDuration / 3600)} giờ video`
                    : `${Math.ceil(totalVideoDuration / 60)} phút video`}
                </span>
              </>
            ) : (
              <div className="h-[2rem] w-full animate-pulse rounded-lg bg-gray-300 dark:bg-gray-700"></div>
            )}
          </li>
          <li className="flex items-center space-x-2">
            {course ? (
              <>
                <BookOpenIcon className="h-6 w-6" />{' '}
                <span>{totalLectures} bài học</span>
              </>
            ) : (
              <div className="h-[2rem] w-full animate-pulse rounded-lg bg-gray-300 dark:bg-gray-700"></div>
            )}
          </li>
          <li className="flex items-center space-x-2">
            {course ? (
              <>
                <FolderArrowDownIcon className="h-6 w-6" />
                <span>{totalDownloadableResource} tài nguyên tải xuống</span>
              </>
            ) : (
              <div className="h-[2rem] w-full animate-pulse rounded-lg bg-gray-300 dark:bg-gray-700"></div>
            )}
          </li>
          <li className="flex items-center space-x-2">
            <BiInfinite className="h-6 w-6" />
            <span>Mua 1 lần, học mãi mãi</span>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default memo(CourseSidebar);
