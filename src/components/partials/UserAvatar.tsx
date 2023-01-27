import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { Case, Switch } from 'react-if';
import UserMenu from './UserMenu';
import { useState } from 'react';

export default function UserAvatar() {
  const { status, data: auth } = useSession();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="avatar relative">
      <Switch>
        <Case condition={status === 'unauthenticated'}>
          <Link
            href={'/login'}
            className="smooth-effect rounded-full border border-gray-500 bg-primary p-4 text-lg text-gray-500 hover:bg-primary/50 dark:border-2 dark:border-yellow-400 md:text-xl"
          >
            Đăng nhập
          </Link>
        </Case>

        <Case condition={status === 'authenticated'}>
          <div
            onClick={() => setShowMenu(true)}
            className="w-16 cursor-pointer overflow-hidden rounded-full dark:ring dark:ring-yellow-500 dark:ring-offset-0"
          >
            <Image
              fill
              className="absolute rounded-full bg-cover bg-center bg-no-repeat"
              alt="user-avatar"
              src={
                auth?.user?.image || 'https://i.ibb.co/1qQJr6S/blank-user.png'
              }
            />
          </div>
        </Case>

        <Case condition={status === 'loading'}>
          <button className="loading btn min-h-[35px] min-w-[60px] rounded-full border border-gray-500 bg-primary text-gray-500 dark:border-2 dark:border-yellow-400" />
        </Case>
      </Switch>

      <UserMenu show={showMenu} setShow={setShowMenu} />
    </div>
  );
}
