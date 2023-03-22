import { TrashIcon as TrashIconSolid } from '@heroicons/react/24/solid';
import { trpc } from '~/utils/trpc';
import Loading from '../buttons/Loading';
import { useEffect } from 'react';
import Link from 'next/link';
import useSocket from '~/contexts/SocketContext';
import toast from 'react-hot-toast';

export default function Notifications() {
  const socketCtx = useSocket();

  const {
    data: notifications,
    status,
    refetch: refetchNotifications,
  } = trpc.user.findNotifications.useQuery();

  const { mutate: deleteNotifications, status: deleteNotificationsStatus } =
    trpc.user.deleteNotifications.useMutation();

  useEffect(() => {
    if (socketCtx?.notificationSignal) {
      refetchNotifications();
      socketCtx.setNotificationSignal(false);
    }
  }, [socketCtx?.notificationSignal]);

  const handleDeleteNotification = (id: string, deleteAll?: boolean) => {
    if (!notifications) return;

    if (deleteAll) {
      const confirm = window.confirm('Chắc chắn không?');
      if (!confirm) return;

      deleteNotifications({ ids: notifications.map((e) => e.id) });
      return;
    }

    deleteNotifications({ ids: [id] });
  };

  useEffect(() => {
    if (deleteNotificationsStatus === 'success') {
      toast.success('Xoá thông báo thành công!');
      refetchNotifications();
      return;
    }

    if (deleteNotificationsStatus === 'error') {
      toast.error('Xảy ra lỗi, thử lại sau!');
    }
  }, [deleteNotificationsStatus]);

  return (
    <section className="mt-4 flex w-full flex-col">
      <button
        onClick={() => handleDeleteNotification('', true)}
        className="w-fit rounded-xl bg-rose-400 p-3 text-white"
      >
        Xoá tất cả
      </button>

      {status === 'loading' ? (
        <div className="absolute-center mx-auto mt-6 min-h-[20rem] w-full space-y-4 md:w-4/5">
          <Loading />
        </div>
      ) : (
        <ul className="mt-6 w-full space-y-4 md:w-4/5">
          {notifications &&
            notifications.length > 0 &&
            notifications.map((n) => {
              return (
                <li
                  key={n.id}
                  className="flex cursor-pointer items-center justify-between space-x-4 rounded-xl bg-white py-4 px-6 shadow dark:bg-dark-background"
                >
                  <Link href={n.location} className="flex space-x-4">
                    <h1 className="whitespace-nowrap text-xl font-bold">
                      {new Date(n.createdAt).toLocaleDateString('vi-VI')}
                    </h1>

                    <p className="text-xl line-clamp-1">{n.content}</p>
                  </Link>

                  <button
                    onClick={() => handleDeleteNotification(n.id)}
                    className="p-2"
                  >
                    <TrashIconSolid className="smooth-effect h-6 w-6 text-rose-500 hover:text-rose-700" />
                  </button>
                </li>
              );
            })}
        </ul>
      )}
    </section>
  );
}
