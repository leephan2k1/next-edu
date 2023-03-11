import type { Student, User } from '@prisma/client';
import { SiGoogleclassroom } from 'react-icons/si';
import { Else, If, Then } from 'react-if';
import Loading from '~/components/buttons/Loading';
import CourseCard from '~/components/shared/CourseCard';

interface MyCoursesProps {
  status: 'error' | 'success' | 'loading';
  data:
    | (Student & {
        courses: {
          category: {
            name: string;
          };
          instructor: User;
          id: string;
          name: string;
          slug: string;
          thumbnail: string | null;
          coursePrice: number | null;
        }[];
      })
    | null
    | undefined;
}

export default function MyCourses({ data, status }: MyCoursesProps) {
  return (
    <div className="min-h-screen w-full pt-[7rem] md:pt-[5rem]">
      <div className="mx-auto flex w-[90%] flex-col md:w-[80%]">
        <h1 className="flex space-x-4 text-3xl">
          <SiGoogleclassroom className="h-8 w-8" />{' '}
          <span className="font-bold">Khoá học đã ghi danh</span>
        </h1>

        {status === 'loading' ? (
          <div className="absolute-center min-h-[10rem] w-full">
            <Loading />
          </div>
        ) : (
          <If condition={data?.courses && data.courses.length > 0}>
            <Then>
              <ul className="mt-10 grid w-full grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
                {data &&
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-ignore
                  data.courses.map((course) => {
                    return <CourseCard key={course.id} course={course} />;
                  })}
              </ul>
            </Then>

            <Else>
              <div className="absolute-center min-h-[5rem] w-full">
                <h2 className="text-center">Bạn chưa ghi danh khoá học nào</h2>
              </div>
            </Else>
          </If>
        )}
      </div>
    </div>
  );
}
