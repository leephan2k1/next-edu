import { useAtomValue } from 'jotai';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { teachingSections } from '~/atoms/teachingSections';
import MainLayout from '~/components/layouts/MainLayout';
import TeachingDashBoardSidebar from '~/components/partials/TeachingDashboardSideBar';

const CourseSummary = dynamic(
  () => import('~/components/partials/CourseSummary'),
);

const CourseCreation = dynamic(
  () => import('~/components/partials/CourseCreation'),
);

const TEACHING_DASHBOARD_SECTIONS = {
  CourseSummary: <CourseSummary />,
  CourseCreation: <CourseCreation />,
};

const TeachingDashboard: NextPage = () => {
  const section = useAtomValue(teachingSections);

  return (
    <div className="relative min-h-screen text-gray-600 dark:text-white md:pl-[16rem]">
      <TeachingDashBoardSidebar />

      {TEACHING_DASHBOARD_SECTIONS[section]}
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
