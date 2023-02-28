import { BsStarFill } from 'react-icons/bs';
import { courseSidebarInViewport } from '~/atoms/courseSidebarAtom';
import { useAtomValue } from 'jotai';
import type { CourseType } from '~/types';
import { StarIcon } from '@heroicons/react/24/outline';

interface BuyOnlyProps {
  course?: CourseType;
  ratingValue: number;
}

export default function BuyOnly({ course, ratingValue }: BuyOnlyProps) {
  const sidebarInViewport = useAtomValue(courseSidebarInViewport);

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
                className="h-5 w-5 text-gray-500 dark:text-white"
              />
            );
          })}
        </div>
      </div>

      <div className="flex w-full items-center space-x-6 px-4 md:w-[30%] lg:w-[25%]">
        <h1 className="text-2xl font-bold">
          {Number(course?.coursePrice) > 0
            ? new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(1950000)
            : 'Miễn phí'}
        </h1>
        <button className="btn-primary btn-lg btn flex-1">
          {Number(course?.coursePrice) > 0 ? 'Mua ngay' : 'Đăng ký ngay'}
        </button>
      </div>
    </div>
  );
}
