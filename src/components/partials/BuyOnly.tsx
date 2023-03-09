import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { BsStarFill } from 'react-icons/bs';
import { Else, If, Then } from 'react-if';
import { courseSidebarInViewport } from '~/atoms/courseSidebarAtom';
import { PATHS } from '~/constants';
import useCourse from '~/contexts/CourseContext';
import useIsEnrolled from '~/hooks/useIsEnrolled';

import { StarIcon } from '@heroicons/react/24/outline';

import Loading from '../buttons/Loading';

import type { CourseType } from '~/types';
import useIsAddToCart from '~/hooks/useIsAddToCart';
import useCart from '~/contexts/CartContext';
interface BuyOnlyProps {
  course?: CourseType;
  ratingValue: number;
}

export default function BuyOnly({ course, ratingValue }: BuyOnlyProps) {
  const sidebarInViewport = useAtomValue(courseSidebarInViewport);
  const courseCtx = useCourse();
  const cartCtx = useCart();

  const router = useRouter();

  const isEnrolled = useIsEnrolled({ course });
  const isAddToCart = useIsAddToCart({ course });

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
      courseCtx?.enrollCourse(course?.slug);
    }
  };

  return (
    <div
      className={`smooth-effect fixed bottom-0 left-0 z-50 flex h-[7rem] w-screen justify-between bg-dark-background px-4 py-2 text-white/80 animate-in fade-in zoom-in dark:bg-white dark:text-gray-600 ${
        sidebarInViewport ? 'lg:hidden ' : ''
      }`}
    >
      <div className={`hidden max-w-[70%] flex-col py-2 md:flex`}>
        <h1 className="font-bold line-clamp-1">{course?.name}</h1>

        <div className="flex w-full items-center space-x-2">
          <span className="mr-4">{ratingValue}</span>
          {Array.from(new Array(ratingValue).keys()).map((elem) => {
            return (
              <BsStarFill key={elem} className="h-5 w-5 text-yellow-500" />
            );
          })}
          {Array.from(new Array(5 - ratingValue).keys()).map((elem) => {
            return (
              <StarIcon
                key={elem}
                className="h-5 w-5 text-white dark:text-gray-500"
              />
            );
          })}
        </div>
      </div>

      <div className="flex w-full items-center space-x-6 px-4 md:w-[30%] lg:w-[25%]">
        {!isEnrolled && (
          <h1 className="text-2xl font-bold">
            {Number(course?.coursePrice) > 0
              ? new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(Number(course?.coursePrice || 0))
              : 'Miễn phí'}
          </h1>
        )}

        <button
          onClick={handleEnrollCourse}
          disabled={courseCtx?.enrollStatus === 'loading' || !course}
          className="absolute-center btn-primary btn-lg btn flex-1"
        >
          <If condition={!isEnrolled}>
            <Then>
              {courseCtx?.enrollStatus === 'loading' ? (
                <Loading />
              ) : Number(course?.coursePrice) > 0 ? (
                'Mua ngay'
              ) : (
                'Đăng ký ngay'
              )}
            </Then>
            <Else>{'Học ngay'}</Else>
          </If>
        </button>
      </div>
    </div>
  );
}
