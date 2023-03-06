import { memo } from 'react';
import type { CourseType } from '~/types';
import CourseComments from './CourseComments';
import Instructor from './Instructor';
import CourseRating from './CourseRating';
import { useSession } from 'next-auth/react';

interface CourseFooterProps {
  course?: CourseType;
  refetchCourse: () => void;
}

function CourseFooter({ course, refetchCourse }: CourseFooterProps) {
  const { data: session } = useSession();

  return (
    <div className="my-16 w-full text-gray-600 dark:text-white/80">
      <div className="mx-auto flex w-full flex-col space-y-14 px-4 md:max-w-[720px] lg:max-w-[1200px]">
        <section className="mx-auto w-full lg:w-[70%]">
          <h1 className="mb-6 text-2xl font-semibold md:text-3xl">
            Người hướng dẫn
          </h1>

          <Instructor instructorId={course?.instructor.id || ''} />
        </section>

        <CourseComments reviews={course?.reviews} />

        {course &&
          course?.students.some(
            (student) => student.userId === session?.user?.id,
          ) && (
            <CourseRating courseId={course?.id} refetchCourse={refetchCourse} />
          )}
      </div>
    </div>
  );
}

export default memo(CourseFooter);
