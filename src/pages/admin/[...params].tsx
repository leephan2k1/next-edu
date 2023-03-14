import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Case, Default, Switch } from 'react-if';
import Loading from '~/components/buttons/Loading';
import AdminDashboard from '~/components/features/admin/AdminDashboard';
import AdminDashboardSidebar from '~/components/features/admin/AdminDashboardSidebar';
import CourseDashboard from '~/components/features/admin/CourseDashboard';
import MoneyHandling from '~/components/features/admin/MoneyHandling';
import MainLayout from '~/components/layouts/MainLayout';
import { PATHS } from '~/constants';
import usePreviousRoute from '~/contexts/HistoryRouteContext';
import { trpc } from '~/utils/trpc';

const Admin: NextPage = () => {
  const prevRoute = usePreviousRoute();
  const router = useRouter();
  const { data: session } = useSession();

  const { data: userInfo, isLoading } = trpc.user.findUserInfo.useQuery(
    { email: session?.user?.email as string },
    { enabled: !!session?.user?.email },
  );

  if (isLoading || !userInfo) {
    return (
      <div className="absolute-center min-h-screen w-full">
        <Loading />
      </div>
    );
  }

  if (userInfo && userInfo.role !== 'ADMIN') {
    router.push(prevRoute?.url || '/');
    return null;
  }

  return (
    <div className="min-h-screen w-full text-gray-600 dark:bg-black dark:text-white md:pl-[16rem]">
      <AdminDashboardSidebar />

      <Switch>
        <Case condition={router.asPath.includes(PATHS.COURSE) && !isLoading}>
          <CourseDashboard />
        </Case>

        <Case condition={router.asPath.includes(PATHS.MONEY) && !isLoading}>
          <MoneyHandling />
        </Case>

        <Case condition={router.asPath.includes(PATHS.DASHBOARD) && !isLoading}>
          <AdminDashboard />
        </Case>

        <Default>{null}</Default>
      </Switch>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// -> There is no need for a header & a footer.
Admin.getLayout = (page: ReactNode) => {
  return <MainLayout>{page}</MainLayout>;
};

export default Admin;
