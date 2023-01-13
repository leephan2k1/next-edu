import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { Case, Switch } from 'react-if';

export default function UserAvatar() {
  const { status, data: auth } = useSession();

  return (
    <div className="avatar">
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
          <div className="w-16 overflow-hidden rounded-full dark:ring dark:ring-yellow-500 dark:ring-offset-0">
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
    </div>
  );
}
