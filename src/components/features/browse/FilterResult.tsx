import { useRouter } from 'next/router';
import { Else, If, Then } from 'react-if';
import { useMediaQuery } from 'usehooks-ts';
import CourseCard, { CardSkeleton } from '~/components/shared/CourseCard';
import { trpc } from '~/utils/trpc';

import Pagination from '~/components/features/browse/Pagination';

export default function FilterResult() {
  const matchesMobile = useMediaQuery('(max-width: 768px)');
  const router = useRouter();
  const numberSkeleton = matchesMobile ? 4 : 12;

  const { data, status } = trpc.course.findCoursesByFilters.useQuery({
    limit: 2,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    page: router.query?.page ? router.query.page : '1',
    ...router.query,
  });

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
      {data?.totalPages && <Pagination totalPages={data?.totalPages} />}
    </div>
  );
}
