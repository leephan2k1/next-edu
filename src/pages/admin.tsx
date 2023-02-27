import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import Loading from '~/components/buttons/Loading';
import VerifyCourses from '~/components/features/admin/VerifyCourses';
import MainLayout from '~/components/layouts/MainLayout';
import TeachingDashBoardSidebar from '~/components/partials/TeachingDashboardSideBar';
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
      <TeachingDashBoardSidebar>
        <button className="smooth-effect flex max-w-[9rem] flex-col items-center space-y-2 rounded-2xl bg-slate-200 p-4 dark:bg-black">
          <AiOutlineFundProjectionScreen className="h-10 w-10" />
          <span>Quản lý khoá học</span>
        </button>
      </TeachingDashBoardSidebar>

      <VerifyCourses
        queryKeys={{ published: true, verified: 'PENDING' }}
        title="Khoá học chờ phê duyệt"
      />
      <VerifyCourses
        queryKeys={{ published: true, verified: 'APPROVED' }}
        title="Khoá học đã phê duyệt"
      />
      <VerifyCourses
        queryKeys={{ published: false, verified: 'REJECT' }}
        title="Khoá học đã từ chối"
      />
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
