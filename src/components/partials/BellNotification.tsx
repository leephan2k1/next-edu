import { BellIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { PATHS } from '~/constants';
import useSocket from '~/contexts/SocketContext';

export default function BellNotification() {
  const socketCtx = useSocket();
  const router = useRouter();

  const handleOnClickBellBtn = () => {
    router.push(`/${PATHS.USER}/${PATHS.USER_PROFILE}?section=notifications`);
    socketCtx?.setNotificationSignal(false);
  };

  return (
    <button onClick={handleOnClickBellBtn} className="relative h-9 w-9">
      <BellIcon className="h-9 w-9 font-bold" />
      {socketCtx?.notificationSignal && (
        <span className="absolute top-0 right-0 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
        </span>
      )}
    </button>
  );
}
