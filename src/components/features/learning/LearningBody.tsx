import { memo, useMemo, useEffect } from 'react';

import BodyOptions from './BodyOptions';
import LearningFooter from './LearningFooter';
import LearningVideo from './LearningVideo';
import { useRouter } from 'next/router';
import { PATHS } from '~/constants';

import type { CourseType } from '~/types';

interface LearningBodyProps {
  course: CourseType;
}

function LearningBody({ course }: LearningBodyProps) {
  const router = useRouter();

  const currentLecture = useMemo(() => {
    if (router.query.params && router.query.params.length > 1) {
      return course.chapters
        .reduce((acc, chapter) => {
          return acc.concat(chapter?.lectures);
        }, [])
        .find((lecture) => lecture?.id === router.query.params[1]);
    }

    return null;
  }, [router.query]);

  // make sure lectureId is always correct
  useEffect(() => {
    if (!currentLecture && course.chapters.length > 0) {
      router.push(
        `/${PATHS.LEARNING}/${course.slug}/${course.chapters[0]?.lectures[0]?.id}`,
      );
    }
  }, [currentLecture]);

  return (
    <div className="flex w-full bg-red-500/0 text-gray-600 dark:text-white/80 md:py-4">
      <div className="full-size flex flex-col">
        <LearningVideo />

        <h1 className="md:font-3xl mx-auto mt-4 px-2 font-bold md:max-w-[720px] lg:max-w-[1000px]">
          {router.query.params && router.query.params[1] && currentLecture
            ? currentLecture.title
            : ''}
        </h1>

        <BodyOptions />

        <LearningFooter course={course} />
      </div>
    </div>
  );
}

export default memo(LearningBody);
