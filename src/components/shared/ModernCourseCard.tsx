import { memo } from 'react';
import Image from 'next/image';
import { useElementSize } from 'usehooks-ts';
import { BsStarFill } from 'react-icons/bs';
import { HeartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import type { CourseType } from '~/types';
import { MAPPING_LEVEL_LANGUAGE } from '~/constants';

interface ModernCourseCardProps {
  shouldShowFvBtn?: boolean;
  shouldRating?: boolean;
  course: CourseType;
  path: string;
}

function ModernCourseCard({
  path,
  course,
  shouldShowFvBtn,
  shouldRating,
}: ModernCourseCardProps) {
  const [imageRef, { height }] = useElementSize();

  return (
    <Link href={path} className="full-size">
      <div className="aspect-h-6 aspect-w-5 relative mt-16 rounded-2xl bg-white shadow-xl dark:bg-dark-background">
        <div className="absolute -top-[10%] left-0 mx-auto max-h-[30%] max-w-[85%]">
          <figure className="relative overflow-hidden rounded-2xl pb-[56.25%]">
            <Image
              ref={imageRef}
              className=""
              src={course.thumbnail || ''}
              fill
              alt="course-thumbnail"
            />
          </figure>
        </div>

        <div
          style={{
            height: `calc(110% - ${height}px)`,
            marginTop: `calc(${height}px - 10%)`,
          }}
          className={`mx-auto flex w-[85%] flex-col py-2 lg:space-y-4`}
        >
          <div className="flex w-full items-center justify-between">
            <span className="rounded-lg bg-gray-500 px-3 py-2 text-sm text-white dark:bg-white dark:text-gray-600 md:text-base">
              {Object.keys(MAPPING_LEVEL_LANGUAGE).find(
                (key) => MAPPING_LEVEL_LANGUAGE[key] === course.courseLevel,
              )}
            </span>

            <span className="text-base font-bold md:text-lg lg:text-xl">
              {new Intl.NumberFormat('en', { notation: 'compact' }).format(
                course.coursePrice as number,
              )}{' '}
              vnđ
            </span>
          </div>

          <h1 className="mt-2 text-xl font-bold line-clamp-2 md:text-2xl md:line-clamp-1 lg:line-clamp-2">
            {course.name}
          </h1>

          <h2
            className={`mb-2 text-lg ${
              shouldRating ? 'line-clamp-1' : 'line-clamp-2'
            } md:my-2`}
          >
            {course.briefDescription}
          </h2>

          {shouldRating && (
            <div className="flex w-full items-center space-x-2 text-sm md:text-base lg:text-xl">
              <span className="mr-4 ">5.0</span>
              <BsStarFill className="h-3 w-3 text-yellow-300 md:h-5 md:w-5" />
              <BsStarFill className="h-3 w-3 text-yellow-300 md:h-5 md:w-5" />
              <BsStarFill className="h-3 w-3 text-yellow-300 md:h-5 md:w-5" />
              <BsStarFill className="h-3 w-3 text-yellow-300 md:h-5 md:w-5" />
              <BsStarFill className="h-3 w-3 text-yellow-300 md:h-5 md:w-5" />
            </div>
          )}

          {shouldShowFvBtn && (
            <div className="my-auto flex w-full items-center justify-end lg:mt-auto lg:pb-2">
              <button className="btn-follow-theme btn-sm btn-circle btn hover:bg-rose-100 hover:text-rose-500 md:btn-md">
                <HeartIcon className="h-4 w-4 md:h-6 md:w-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default memo(ModernCourseCard);
