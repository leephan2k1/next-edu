import DashBoardSidebar from '~/components/partials/DashBoardSidebar';

import {
  ChartBarIcon,
  InformationCircleIcon,
  WalletIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { PATHS } from '~/constants';

export default function TeachingSidebar() {
  const router = useRouter();

  return (
    <DashBoardSidebar>
      <button
        onClick={() => {
          router.replace(`/${PATHS.TEACHING}/${PATHS.COURSE}`);
        }}
        className={`smooth-effect flex flex-col items-center space-y-2 rounded-2xl p-4 hover:bg-slate-200 hover:dark:bg-black ${
          router.query?.params &&
          router.query.params[0] === PATHS.COURSE &&
          'bg-slate-200 dark:bg-black'
        }`}
      >
        <AiOutlineFundProjectionScreen className="h-10 w-10" />
        <span>Khoá học</span>
      </button>

      <button
        onClick={() => {
          router.replace(`/${PATHS.TEACHING}/${PATHS.DASHBOARD}`);
        }}
        className={`smooth-effect flex flex-col items-center space-y-2 rounded-2xl p-4 hover:bg-slate-200 hover:dark:bg-black ${
          router.query?.params &&
          router.query.params[0] === PATHS.DASHBOARD &&
          'bg-slate-200 dark:bg-black'
        }`}
      >
        <ChartBarIcon className="h-10 w-10" />
        <span>Phân tích</span>
      </button>

      {/* <button className="smooth-effect flex flex-col items-center space-y-2 rounded-2xl p-4 hover:bg-slate-200 hover:dark:bg-black">
        <VscOrganization className="h-10 w-10" />
        <span>Tổ chức</span>
      </button> */}

      <button
        onClick={() => {
          router.replace(`/${PATHS.TEACHING}/${PATHS.MY_WALLET}`);
        }}
        className={`smooth-effect flex flex-col items-center space-y-2 rounded-2xl p-4 hover:bg-slate-200 hover:dark:bg-black ${
          router.query?.params &&
          router.query.params[0] === PATHS.MY_WALLET &&
          'bg-slate-200 dark:bg-black'
        }`}
      >
        <WalletIcon className="h-10 w-10" />
        <span>Ví của tôi</span>
      </button>

      <button
        onClick={() => {
          router.replace(`/${PATHS.TEACHING}/${PATHS.INSTRUCTIONS}`);
        }}
        className={`smooth-effect flex flex-col items-center space-y-2 rounded-2xl p-4 hover:bg-slate-200 hover:dark:bg-black ${
          router.query?.params &&
          router.query.params[0] === PATHS.INSTRUCTIONS &&
          'bg-slate-200 dark:bg-black'
        }`}
      >
        <InformationCircleIcon className="h-10 w-10" />
        <span>Hướng dẫn</span>
      </button>
    </DashBoardSidebar>
  );
}
