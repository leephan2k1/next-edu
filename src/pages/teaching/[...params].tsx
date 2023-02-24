import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Case, Default, Switch } from 'react-if';
import MainLayout from '~/components/layouts/MainLayout';
import CourseCreation from '~/components/partials/CourseCreation';
import CourseSummary from '~/components/partials/CourseSummary';
import TeachingDashBoardSidebar from '~/components/partials/TeachingDashboardSideBar';
import { PATHS } from '~/constants';

const TeachingDashboard: NextPage = () => {
  const router = useRouter();

  return (
    <div className="relative min-h-screen text-gray-600 dark:text-white md:pl-[16rem]">
      <TeachingDashBoardSidebar />

      <Switch>
        <Case condition={router.asPath.includes('dashboard')}>
          <CourseSummary />
        </Case>

        <Case
          condition={
            router.asPath.includes(PATHS.CREATE_COURSE) ||
            router.asPath.includes(PATHS.EDIT_COURSE)
          }
        >
          <CourseCreation />
        </Case>

        <Default>
          <div></div>
        </Default>
      </Switch>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// -> There is no need for a header & a footer.
TeachingDashboard.getLayout = (page: ReactNode) => {
  return <MainLayout>{page}</MainLayout>;
};

export default TeachingDashboard;
