import { useSetAtom } from 'jotai';
import Image from 'next/image';
import { memo, useEffect, useRef, useMemo } from 'react';
import { BiInfinite } from 'react-icons/bi';
import { useIntersectionObserver } from 'usehooks-ts';
import { courseSidebarInViewport } from '~/atoms/courseSidebarAtom';
import type { CourseType } from '~/types';

import {
  BookOpenIcon,
  FolderArrowDownIcon,
  HeartIcon,
  PlayCircleIcon,
} from '@heroicons/react/24/outline';

interface CourseSidebarProps {
  course?: CourseType;
}

function CourseSidebar({ course }: CourseSidebarProps) {
  const refBtn = useRef<HTMLButtonElement | null>(null);
  const setSidebarState = useSetAtom(courseSidebarInViewport);
  const entry = useIntersectionObserver(refBtn, {});

  useEffect(() => {
    setSidebarState(!!entry?.isIntersecting);
  }, [entry?.isIntersecting]);

  const totalVideoDuration = useMemo(() => {
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
                if (rsc.type === 'video' && !isNaN(videoDur)) {
                  return videoDur + Number(rsc.videoDuration);
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

  const totalLectures = useMemo(() => {
    if (course) {
      return course.chapters.reduce((nChapter, chapter) => {
        if (chapter.lectures) {
          return nChapter + chapter.lectures?.length;
        }

        return nChapter;
      }, 0);
    }
  }, [course]);

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
        <button className="btn-primary btn-lg btn w-[70%]">
          Thêm vào giỏ hàng
        </button>
        <button className="btn-active btn-ghost btn-lg btn flex-1 text-gray-600 dark:text-white/60">
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
        <ul className="flex flex-col space-y-4">
          <li className="flex items-center space-x-2">
            {course ? (
              <>
                <PlayCircleIcon className="h-6 w-6" />{' '}
                <span>{totalVideoDuration} giờ video</span>
              </>
            ) : (
              <div className="h-[2rem] w-full animate-pulse rounded-lg bg-gray-300 dark:bg-gray-700"></div>
            )}
          </li>
          <li className="flex items-center space-x-2">
            {course ? (
              <>
                <BookOpenIcon className="h-6 w-6" />{' '}
                <span>{totalLectures} bài giảng</span>
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
