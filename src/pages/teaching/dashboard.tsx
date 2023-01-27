import { type NextPage } from 'next';
import MainLayout from '~/components/layouts/MainLayout';
import TeachingDashBoardSidebar from '~/components/partials/TeachingDashboardSidebar';

const TeachingDashboard: NextPage = () => {
  return (
    <div className="relative h-screen text-gray-600 dark:text-white">
      <TeachingDashBoardSidebar />
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
