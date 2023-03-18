import { TrashIcon as TrashIconSolid } from '@heroicons/react/24/solid';
import { trpc } from '~/utils/trpc';
import Loading from '../buttons/Loading';
import { useEffect } from 'react';
import Link from 'next/link';
import useSocket from '~/contexts/SocketContext';

export default function Notifications() {
  const socketCtx = useSocket();

  const {
    data: notifications,
    status,
    refetch,
  } = trpc.user.findNotifications.useQuery();

  useEffect(() => {
    if (socketCtx?.notificationSignal) {
      refetch();
      socketCtx.setNotificationSignal(false);
    }
  }, [socketCtx?.notificationSignal]);

  return (
    <section className="mt-4 flex w-full flex-col">
      <button className="w-fit rounded-xl bg-rose-400 p-3 text-white">
        Xoá tất cả
      </button>

      {status === 'loading' ? (
        <div className="absolute-center mx-auto mt-6 min-h-[20rem] w-full space-y-4 md:w-4/5">
          <Loading />
        </div>
      ) : (
        <ul className="mx-auto mt-6 w-full space-y-4 md:w-4/5">
          {notifications &&
            notifications.length > 0 &&
            notifications.map((n) => {
              return (
                <li key={n.id}>
                  <Link
                    href={n.location}
                    className="flex cursor-pointer items-center justify-between space-x-4 rounded-xl bg-white py-4 px-6 shadow dark:bg-dark-background"
                  >
                    <h1 className="whitespace-nowrap text-xl font-bold">
                      {new Date(n.createdAt).toLocaleDateString('vi-VI')}
                    </h1>

                    <p className="text-xl line-clamp-1">{n.content}</p>

                    <button className="p-2">
                      <TrashIconSolid className="smooth-effect h-6 w-6 text-rose-500 hover:text-rose-700" />
                    </button>
                  </Link>
                </li>
              );
            })}
        </ul>
      )}
    </section>
  );
}
