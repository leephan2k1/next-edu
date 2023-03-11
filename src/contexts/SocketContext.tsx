// ref solution: https://github.com/feathersjs/feathers/issues/1149
//               https://socket.io/how-to/use-with-react-hooks

import { useSession } from 'next-auth/react';
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import type { Socket } from 'socket.io';
import { io } from 'socket.io-client';
import type { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { getBaseUrl } from '~/utils/trpc';

interface SocketContextType {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  connected: boolean;
}
interface SocketContextProps {
  children: ReactNode;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketContextProvider = ({ children }: SocketContextProps) => {
  const { data } = useSession();
  // connected flag
  const [connected, setConnected] = useState<boolean>(false);
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

  return (
    <SocketContext.Provider value={{ connected, socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default function useSocket() {
  return useContext(SocketContext);
}
