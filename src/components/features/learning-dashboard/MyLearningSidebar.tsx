import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import DashBoardSidebar from '~/components/partials/DashBoardSidebar';
import { useRouter } from 'next/router';

import { ChartBarIcon } from '@heroicons/react/24/outline';
import { PATHS } from '~/constants';

export default function MyLearningSidebar() {
  const router = useRouter();

  return (
    <DashBoardSidebar>
      <button
        onClick={() => {
          router.replace(`/${PATHS.MY_LEARNING}/${PATHS.COURSE}`);
        }}
        className={`smooth-effect flex max-w-[9rem] flex-col items-center space-y-2 rounded-2xl ${
          router.query?.params &&
          router.query.params[0] === 'course' &&
          'bg-slate-200 dark:bg-black'
        } p-4 `}
      >
        <AiOutlineFundProjectionScreen className="h-10 w-10" />
        <span>Khoá học</span>
      </button>
      <button
        onClick={() => {
          router.replace(`/${PATHS.MY_LEARNING}/${PATHS.DASHBOARD}`);
        }}
        className={`smooth-effect flex max-w-[9rem] flex-col items-center space-y-2 rounded-2xl p-4 ${
          router.query?.params &&
          router.query.params[0] === 'dashboard' &&
          'bg-slate-200 dark:bg-black'
        }`}
      >
        <ChartBarIcon className="h-10 w-10" />
        <span>Phân tích</span>
      </button>
    </DashBoardSidebar>
  );
}
