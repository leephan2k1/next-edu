import { useSetAtom } from 'jotai';
import Image from 'next/image';
import { memo, useEffect, useRef } from 'react';
import { BiInfinite } from 'react-icons/bi';
import { useIntersectionObserver } from 'usehooks-ts';
import { courseSidebarInViewport } from '~/atoms/courseSidebarAtom';

import {
  BookOpenIcon,
  FolderArrowDownIcon,
  HeartIcon,
  PlayCircleIcon,
} from '@heroicons/react/24/outline';

function CourseSidebar() {
  const refBtn = useRef<HTMLButtonElement | null>(null);
  const setSidebarState = useSetAtom(courseSidebarInViewport);
  const entry = useIntersectionObserver(refBtn, {});

  useEffect(() => {
    setSidebarState(!!entry?.isIntersecting);
  }, [entry?.isIntersecting]);

  return (
    <aside
      className={`glass hidden h-[80vh] max-w-[30rem] flex-1 space-y-8 overflow-hidden rounded-2xl text-gray-600 dark:text-white/60 lg:block`}
    >
      <div className="w-full">
        <div className="relative overflow-hidden rounded-2xl bg-red-500 pb-[56.25%]">
          <Image
            className="absolute inset-0 bg-center bg-no-repeat"
            fill
            alt="course-thumbnail"
            src={
              'https://img-b.udemycdn.com/course/750x422/1565838_e54e_16.jpg'
            }
          />
        </div>
      </div>

      <h1 className="px-6 text-4xl font-bold">
        {new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(1950000)}
      </h1>

      <div className="flex w-full space-x-4 px-4">
        <button className="btn-primary btn-lg btn w-[70%]">
          Thêm vào giỏ hàng
        </button>
        <button className="btn-ghost btn-active btn-lg btn flex-1 text-gray-600 dark:text-white/60">
          <HeartIcon className="h-8 w-8" />
        </button>
      </div>

      <div className="flex w-full space-x-4 px-4">
        <button
          ref={refBtn}
          className="smooth-effect w-full rounded-xl border border-gray-600 p-3 uppercase hover:bg-white dark:border-white/60 dark:hover:bg-dark-background"
        >
          Mua ngay
        </button>
      </div>

      <div className="flex w-full flex-col space-y-2 px-4">
        <h1 className="text-2xl font-semibold">Khoá học này bao gồm:</h1>
        <ul className="flex flex-col space-y-2">
          <li className="flex items-center space-x-2">
            <PlayCircleIcon className="h-6 w-6" /> <span>40 giờ video</span>
          </li>
          <li className="flex items-center space-x-2">
            <BookOpenIcon className="h-6 w-6" /> <span>20 bài giảng</span>
          </li>
          <li className="flex items-center space-x-2">
            <FolderArrowDownIcon className="h-6 w-6" />{' '}
            <span>10 tài nguyên tải xuống</span>
          </li>
          <li className="flex items-center space-x-2">
            <BiInfinite className="h-6 w-6" />{' '}
            <span>Mua 1 lần, học mãi mãi</span>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default memo(CourseSidebar);
