import React from 'react';
import CourseCard, { CardSkeleton } from '~/components/shared/CourseCard';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { trpc } from '~/utils/trpc';
import { useMediaQuery } from 'usehooks-ts';
import { If, Then, Else } from 'react-if';

export default function FilterResult() {
  const matchesMobile = useMediaQuery('(max-width: 768px)');
  const router = useRouter();
  const numberSkeleton = matchesMobile ? 4 : 12;

  const { data, status } = trpc.course.findCoursesByFilters.useQuery({
    limit: 12,
    page: 1,
    ...router.query,
  });

  useEffect(() => {
    // console.log('query router:: ', router.query);
  }, [router.query]);

  return (
    <div className="mt-10 grid w-full grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
      <If condition={status === 'loading'}>
        <Then>
          {Array.from(new Array(numberSkeleton).keys()).map((e) => {
            return <CardSkeleton key={e} />;
          })}
        </Then>
        <Else>
          {data?.courses && data.courses.length > 0 ? (
            data.courses.map((course) => {
              return <CourseCard key={course.id} course={course} />;
            })
          ) : (
            <h4 className="col-span-2 w-full text-center text-2xl md:col-span-4 lg:col-span-6">
              Khoá học cần tìm chưa có!
            </h4>
          )}
        </Else>
      </If>
    </div>
  );
}
