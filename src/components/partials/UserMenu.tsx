import { Transition } from '@headlessui/react';
import {
  ArrowLeftOnRectangleIcon,
  BellIcon,
  BookmarkIcon,
  BookOpenIcon,
  ChartBarIcon,
  CreditCardIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, memo, useRef } from 'react';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { MdSupervisorAccount } from 'react-icons/md';
import { useEffectOnce, useOnClickOutside } from 'usehooks-ts';
import { PATHS } from '~/constants';

import Teleport from '../shared/Teleport';

import type { Dispatch, SetStateAction } from 'react';
interface UserMenuProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

function UserMenu({ show, setShow }: UserMenuProps) {
  const router = useRouter();
  const { data: auth } = useSession();

  const ref = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(ref, () => {
    setShow(false);
  });

  //effect turn off the UI when user navigate
  useEffectOnce(() => {
    const handleRouteChange = () => {
      setShow(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  });

  return (
    <Transition
      show={show}
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <div
        ref={ref}
        className="absolute top-full right-0 z-[500] flex h-[54rem] w-[30rem] flex-col rounded-xl bg-white p-4 shadow-xl dark:bg-highlight"
      >
        <Teleport>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 z-[400] bg-black bg-opacity-25" />
          </Transition.Child>
        </Teleport>

        <Link
          href={`/${PATHS.USER}/${PATHS.USER_PROFILE}`}
          className="smooth-effect flex cursor-pointer space-x-3 rounded-2xl p-3 hover:bg-gray-200 dark:hover:bg-black"
        >
          <figure className="min-h-20 min-w-20 relative h-20 w-20 rounded-full">
            <Image
              fill
              className="absolute rounded-full bg-cover bg-center bg-no-repeat"
              alt="user-avatar"
              src={
                auth?.user?.image || 'https://i.ibb.co/1qQJr6S/blank-user.png'
              }
            />
          </figure>
          <div className="flex flex-1 flex-col justify-center">
            <h1 className="font-semibold">{auth?.user?.name}</h1>
            <h2>{auth?.user?.email}</h2>
          </div>
        </Link>

        <hr className="mx-auto my-4 w-[80%] dark:border-white/30" />

        <h2 className="smooth-effect flex cursor-pointer items-center space-x-4 rounded-2xl p-3 hover:bg-gray-200 dark:hover:bg-black">
          <BookOpenIcon className="h-6 w-6" /> <span>Khoá học của tôi</span>
        </h2>

        <h2 className="smooth-effect flex cursor-pointer items-center space-x-4 rounded-2xl p-3 hover:bg-gray-200 dark:hover:bg-black">
          <ChartBarIcon className="h-6 w-6" /> <span>Quá trình học</span>
        </h2>

        <Link
          href={`/${PATHS.TEACHING}/${PATHS.TEACHING_DASHBOARD}`}
          className="smooth-effect flex cursor-pointer items-center space-x-4 rounded-2xl p-3 hover:bg-gray-200 dark:hover:bg-black"
        >
          <FaChalkboardTeacher className="h-6 w-6" /> <span>Giảng dạy</span>
        </Link>

        <Link
          href={`/${PATHS.USER}/${PATHS.USER_PROFILE}?section=followed-courses`}
          className="smooth-effect flex cursor-pointer items-center space-x-4 rounded-2xl p-3 hover:bg-gray-200 dark:hover:bg-black"
        >
          <BookmarkIcon className="h-6 w-6" /> <span>Khoá học theo dõi</span>
        </Link>

        <hr className="mx-auto my-4 w-[80%] dark:border-white/30" />

        <Link
          href={`/${PATHS.USER}/${PATHS.USER_PROFILE}?section=parent-control`}
          className="smooth-effect flex cursor-pointer items-center space-x-4 rounded-2xl p-3 hover:bg-gray-200 dark:hover:bg-black"
        >
          <MdSupervisorAccount className="h-6 w-6" />{' '}
          <span>Phụ huynh quản lý</span>
        </Link>

        <hr className="mx-auto my-4 w-[80%] dark:border-white/30" />

        <Link
          href={`/${PATHS.USER}/${PATHS.USER_PROFILE}?section=message`}
          className="smooth-effect flex cursor-pointer items-center space-x-4 rounded-2xl p-3 hover:bg-gray-200 dark:hover:bg-black"
        >
          <EnvelopeIcon className="h-6 w-6" /> <span>Tin nhắn</span>
        </Link>

        <Link
          href={`/${PATHS.USER}/${PATHS.USER_PROFILE}?section=notifications`}
          className="smooth-effect flex cursor-pointer items-center space-x-4 rounded-2xl p-3 hover:bg-gray-200 dark:hover:bg-black"
        >
          <BellIcon className="h-6 w-6" /> <span>Thông báo</span>
        </Link>

        <hr className="mx-auto my-4 w-[80%] dark:border-white/30" />

        <Link
          href={`/${PATHS.USER}/${PATHS.USER_PROFILE}?section=payment-history`}
          className="smooth-effect flex cursor-pointer items-center space-x-4 rounded-2xl p-3 hover:bg-gray-200 dark:hover:bg-black"
        >
          <CreditCardIcon className="h-6 w-6" /> <span>Lịch sử thanh toán</span>
        </Link>

        <hr className="mx-auto my-4 w-[80%] dark:border-white/30" />

        <button
          onClick={() => {
            setShow(false);
            signOut({ redirect: false });
          }}
          className="smooth-effect flex w-full cursor-pointer items-center space-x-4 rounded-2xl p-3 hover:bg-gray-200 dark:hover:bg-black"
        >
          <ArrowLeftOnRectangleIcon className="h-6 w-6" />{' '}
          <span>Đăng xuất</span>
        </button>
      </div>
    </Transition>
  );
}

export default memo(UserMenu);
