import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Case, Default, Switch } from 'react-if';
import TeachingDashboard from '~/components/features/teaching/TeachingDashboard';
import TeachingSidebar from '~/components/features/teaching/TeachingSidebar';
import MainLayout from '~/components/layouts/MainLayout';
import CourseCreation from '~/components/partials/CourseCreation';
import CourseSummary from '~/components/partials/CourseSummary';
import { PATHS } from '~/constants';

const TeachingDashboardPage: NextPage = () => {
  const router = useRouter();

  return (
    <div className="relative min-h-screen text-gray-600 dark:text-white md:pl-[16rem]">
      <TeachingSidebar />

      <Switch>
        <Case condition={router.asPath.includes(PATHS.COURSE)}>
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

        <Case condition={router.asPath.includes(PATHS.DASHBOARD)}>
          <TeachingDashboard />
        </Case>

        <Default>{null}</Default>
      </Switch>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// -> There is no need for a header & a footer.
TeachingDashboardPage.getLayout = (page: ReactNode) => {
  return <MainLayout>{page}</MainLayout>;
};

export default TeachingDashboardPage;
