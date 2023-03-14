import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import DashBoardSidebar from '~/components/partials/DashBoardSidebar';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { PATHS } from '~/constants';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AdminDashboardSidebar() {
  const router = useRouter();

  return (
    <DashBoardSidebar>
      <button>
        <Link
          className={`smooth-effect flex max-w-[9rem] flex-col items-center space-y-2 rounded-2xl p-4 ${
            router.query?.params &&
            router.query.params[0] === PATHS.COURSE &&
            'bg-slate-200 dark:bg-black'
          }`}
          href={`/${PATHS.ADMIN}/${PATHS.COURSE}`}
        >
          <AiOutlineFundProjectionScreen className="h-10 w-10" />
          <span>Quản lý khoá học</span>
        </Link>
      </button>

      <button>
        <Link
          className={`smooth-effect flex max-w-[9rem] flex-col items-center space-y-2 rounded-2xl p-4 ${
            router.query?.params &&
            router.query.params[0] === PATHS.MONEY &&
            'bg-slate-200 dark:bg-black'
          }`}
          href={`/${PATHS.ADMIN}/${PATHS.MONEY}`}
        >
          <CurrencyDollarIcon className="h-10 w-10" />
          <span>Quản lý tiền</span>
        </Link>
      </button>
    </DashBoardSidebar>
  );
}
