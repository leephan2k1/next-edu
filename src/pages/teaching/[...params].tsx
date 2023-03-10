import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Case, Default, Switch } from 'react-if';
import MainLayout from '~/components/layouts/MainLayout';
import CourseCreation from '~/components/partials/CourseCreation';
import CourseSummary from '~/components/partials/CourseSummary';
import DashBoardSidebar from '~/components/partials/DashBoardSidebar';
import { PATHS } from '~/constants';

import {
  ChartBarIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { VscOrganization } from 'react-icons/vsc';

const TeachingDashboard: NextPage = () => {
  const router = useRouter();

  return (
    <div className="relative min-h-screen text-gray-600 dark:text-white md:pl-[16rem]">
      <DashBoardSidebar>
        <button className="smooth-effect flex flex-col items-center space-y-2 rounded-2xl bg-slate-200 p-4 dark:bg-black">
          <AiOutlineFundProjectionScreen className="h-10 w-10" />
          <span>Khoá học</span>
        </button>

        <button className="smooth-effect flex flex-col items-center space-y-2 rounded-2xl p-4 hover:bg-slate-200 hover:dark:bg-black">
          <ChartBarIcon className="h-10 w-10" />
          <span>Phân tích</span>
        </button>

        <button className="smooth-effect flex flex-col items-center space-y-2 rounded-2xl p-4 hover:bg-slate-200 hover:dark:bg-black">
          <VscOrganization className="h-10 w-10" />
          <span>Tổ chức</span>
        </button>

        <button className="smooth-effect flex flex-col items-center space-y-2 rounded-2xl p-4 hover:bg-slate-200 hover:dark:bg-black">
          <InformationCircleIcon className="h-10 w-10" />
          <span>Hướng dẫn</span>
        </button>
      </DashBoardSidebar>

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
