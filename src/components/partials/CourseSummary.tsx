import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { RiDraftLine } from 'react-icons/ri';
import { SiGoogleclassroom } from 'react-icons/si';
import { VscTasklist } from 'react-icons/vsc';
import { Else, If, Then } from 'react-if';
import { PATHS } from '~/constants';
import { trpc } from '~/utils/trpc';

import Loading from '../buttons/Loading';
import ModernCourseCard from '../shared/ModernCourseCard';
import CoursesDraft from './CoursesDraft';

import type { ReactNode } from 'react';
import type { VerifiedStateType } from '~/types';

export default function CourseCreation() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col space-y-14 pt-[7rem] pb-[5rem] md:pt-[5rem]">
      <div className="mx-auto flex h-[10rem] w-[95%] items-center justify-between rounded border border-dashed border-gray-600 px-6 py-4 dark:border-white md:w-[80%] lg:w-[60%]">
        <p className="italic">
          Bắt đầu chia sẽ kiến thức hôm nay để mang giá trị đến cộng đồng!
        </p>
        <button
          onClick={() => router.push(`${PATHS.CREATE_COURSE}`)}
          className="smooth-effect w-fit min-w-fit rounded-xl bg-yellow-100 p-4 text-yellow-800 shadow-xl hover:scale-110 dark:text-gray-700"
        >
          Tạo khoá học
        </button>
      </div>

      <CourseList verified={'APPROVED'}>
        <h1 className="flex space-x-4 text-3xl">
          <SiGoogleclassroom className="h-8 w-8" />{' '}
          <span className="font-bold">Khoá học đang hướng dẫn</span>
        </h1>
      </CourseList>

      <div className="mx-auto flex w-[90%] flex-col overflow-x-scroll md:w-[80%]">
        <h1 className="flex space-x-4 text-3xl">
          <RiDraftLine className="h-8 w-8" />
          <span className="font-bold">Khoá học đang soạn</span>
        </h1>

        <CoursesDraft />
      </div>

      <CourseList verified={'PENDING'}>
        <h1 className="flex space-x-4 text-3xl">
          <VscTasklist className="h-8 w-8" />{' '}
          <span className="font-bold">Khoá học đang chờ phê duyệt</span>
        </h1>
      </CourseList>
    </div>
  );
}

function CourseList({
  children,
  verified,
}: {
  children: ReactNode;
  verified: VerifiedStateType;
}) {
  const { data: session } = useSession();

  const { data: courses, isLoading } =
    trpc.course.findWaitingListCourses.useQuery({
      userId: session?.user?.id as string,
      published: true,
      verified,
    });

  if (Array.isArray(courses) && courses.length === 0) {
    return (
      <div className="mx-auto flex w-[90%] flex-col md:w-[80%]">
        {children}
        <h4 className="my-4 italic">Chưa có khoá học nào!</h4>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-[90%] flex-col md:w-[80%]">
      {children}
      <If condition={isLoading || !courses}>
        <Then>
          <div className="full-size absolute-center min-h-[25rem]">
            <Loading />
          </div>
        </Then>
        <Else>
          <ul className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {Array.isArray(courses) &&
              courses.length > 0 &&
              courses.map((course) => {
                return (
                  <li key={course.id}>
                    <ModernCourseCard
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      course={course}
                      path={
                        verified === 'PENDING'
                          ? `/${PATHS.TEACHING}/${PATHS.EDIT_COURSE}?slug=${course.slug}`
                          : `/${PATHS.COURSE}/${course.slug}`
                      }
                    />
                  </li>
                );
              })}
          </ul>
        </Else>
      </If>
    </div>
  );
}
