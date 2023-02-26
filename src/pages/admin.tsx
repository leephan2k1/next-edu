import { type NextPage } from 'next';
import MainLayout from '~/components/layouts/MainLayout';
import VerifyCourses from '~/components/features/admin/VerifyCourses';
import TeachingDashBoardSidebar from '~/components/partials/TeachingDashboardSideBar';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';

const Admin: NextPage = () => {
  return (
    <div className="min-h-screen w-full text-gray-600 dark:bg-black dark:text-white md:pl-[16rem]">
      <TeachingDashBoardSidebar>
        <button className="smooth-effect flex max-w-[9rem] flex-col items-center space-y-2 rounded-2xl bg-slate-200 p-4 dark:bg-black">
          <AiOutlineFundProjectionScreen className="h-10 w-10" />
          <span>Quản lý khoá học</span>
        </button>
      </TeachingDashBoardSidebar>

      <VerifyCourses title="Khoá học chờ phê duyệt" />
      <VerifyCourses title="Khoá học đã phê duyệt" />
      <VerifyCourses title="Khoá học đã từ chối" />
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
