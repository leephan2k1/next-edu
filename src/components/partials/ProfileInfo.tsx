import { memo } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

function ProfileMenu() {
  return (
    <ul className="flex w-full space-x-4 overflow-x-scroll md:flex-col md:space-x-0 md:space-y-8 md:px-4">
      <li>
        <button className="smooth-effect whitespace-nowrap rounded-xl bg-yellow-500 p-4 text-white">
          Hồ sơ
        </button>
      </li>
      <li>
        <button className="smooth-effect whitespace-nowrap rounded-xl bg-white p-4 shadow-lg hover:bg-stone-200 dark:bg-dark-background dark:hover:bg-white/20">
          Khoá học theo dõi
        </button>
      </li>
      <li>
        <button className="smooth-effect whitespace-nowrap rounded-xl bg-white p-4 shadow-lg hover:bg-stone-200 dark:bg-dark-background dark:hover:bg-white/20">
          Phụ huynh quản lý
        </button>
      </li>
      <li>
        <button className="smooth-effect whitespace-nowrap rounded-xl bg-white p-4 shadow-lg hover:bg-stone-200 dark:bg-dark-background dark:hover:bg-white/20">
          Tin nhắn
        </button>
      </li>
      <li>
        <button className="smooth-effect whitespace-nowrap rounded-xl bg-white p-4 shadow-lg hover:bg-stone-200 dark:bg-dark-background dark:hover:bg-white/20">
          Thông báo
        </button>
      </li>
      <li>
        <button className="smooth-effect whitespace-nowrap rounded-xl bg-white p-4 shadow-lg hover:bg-stone-200 dark:bg-dark-background dark:hover:bg-white/20">
          Lịch sử thanh toán
        </button>
      </li>
    </ul>
  );
}

function ProfileInfo() {
  const { data: auth } = useSession();

  return (
    <div className="flex w-full flex-col items-center space-y-4 px-4 md:w-[25%] lg:w-[20%]">
      <figure className="rounded-ful relative h-36 w-36">
        <Image
          fill
          className="absolute rounded-full bg-cover bg-center bg-no-repeat"
          alt="user-avatar"
          src={auth?.user?.image || 'https://i.ibb.co/1qQJr6S/blank-user.png'}
        />
      </figure>

      <h1 className="text-3xl">{auth?.user?.name}</h1>
      <h2 className="text-xl">{auth?.user?.email}</h2>

      <ProfileMenu />
    </div>
  );
}

export default memo(ProfileInfo);
