// ref solution: https://github.com/feathersjs/feathers/issues/1149
//               https://socket.io/how-to/use-with-react-hooks

import { useSession } from 'next-auth/react';
import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { getBaseUrl } from '~/utils/trpc';

import type { ReactNode, Dispatch, SetStateAction } from 'react';
import type { Socket } from 'socket.io';
import type { DefaultEventsMap } from 'socket.io/dist/typed-events';
interface SocketContextType {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  connected: boolean;
  notificationSignal: boolean;
  setNotificationSignal: Dispatch<SetStateAction<boolean>>;
}
interface SocketContextProps {
  children: ReactNode;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketContextProvider = ({ children }: SocketContextProps) => {
  const { data } = useSession();
  // connected flag
  const [connected, setConnected] = useState<boolean>(false);
  const [notificationSignal, setNotificationSignal] = useState(false);

  const [socket, setSocket] = useState<Socket<
    DefaultEventsMap,
    DefaultEventsMap
  > | null>(null);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const userId = data?.user?.id;

  useEffect(() => {
    // connect to socket server

    const socket = io(getBaseUrl(), {
      path: `/api/socketio`,
    });

    // log socket connection
    socket.on('connect', () => {
      setSocket(socket);
      setConnected(true);
    });
  }, []);

  useEffect(() => {
    if (connected && socket && userId) {
      socket.emit('online', { userId });
    }

    return () => {
      socket?.off('connect');
      socket?.off('disconnect');
      socket?.off('online');
    };
  }, [socket, connected, data?.user]);

  useEffect(() => {
    if (connected && socket) {
      socket.on('notification', () => {
        setNotificationSignal(true);
      });
    }

    return () => {
      setNotificationSignal(false);
    };
  }, [socket, connected]);

  return (
    <SocketContext.Provider
      value={{ connected, socket, notificationSignal, setNotificationSignal }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default function useSocket() {
  return useContext(SocketContext);
}
