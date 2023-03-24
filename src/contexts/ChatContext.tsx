import { createContext, useContext, useEffect, useState, useRef } from 'react';

import type { User, ChatSession } from '@prisma/client';
import { useSession } from 'next-auth/react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { trpc } from '~/utils/trpc';

type Participant = Pick<User, 'id' | 'image' | 'name'>;

interface ChatContextType {
  chatSessions: Participant[];
  sessionsData:
    | (ChatSession & {
        users: {
          id: string;
          name: string | null;
          image: string | null;
        }[];
      })[]
    | undefined;
  setChatSessions: Dispatch<SetStateAction<Participant[]>>;
  currentSession: {
    id: string;
    pOne: string;
    pTwo: string;
    userTwo: {
      id: string;
      name: string;
      image: string;
    };
  } | null;
  setCurrentSession: Dispatch<
    SetStateAction<{
      id: string;
      pOne: string;
      pTwo: string;
      userTwo: {
        id: string;
        name: string;
        image: string;
      };
    } | null>
  >;
}
interface ChatContextProps {
  children: ReactNode;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatContextProvider = ({ children }: ChatContextProps) => {
  const { data: userSession } = useSession();
  const [chatSessions, setChatSessions] = useState<Participant[]>([]);
  const [currentSession, setCurrentSession] = useState<{
    id: string;
    pOne: string;
    pTwo: string;
    userTwo: {
      id: string;
      name: string;
      image: string;
    };
  } | null>(null);

  const firstSet = useRef(false);

  const { data: sessionsData } = trpc.chat.findSessions.useQuery();

  useEffect(() => {
    if ((!userSession && !userSession?.user?.id) || !sessionsData) return;

    setChatSessions((cSessions) => {
      const newSessions = sessionsData.reduce((acc, e) => {
        const p2 = e.users.filter((usr) => usr.id !== userSession?.user?.id)[0];

        if (p2) return [...acc, { id: p2.id, name: p2.name, image: p2.image }];
        return acc;
      }, []);

      return [...cSessions, ...newSessions].filter(
        (value, idx, self) => idx === self.findIndex((t) => t.id === value.id),
      );
    });
  }, [sessionsData, userSession]);

  useEffect(() => {
    if (
      chatSessions.length > 0 &&
      userSession?.user?.id &&
      !firstSet.current &&
      chatSessions[0] &&
      sessionsData &&
      sessionsData[0]
    ) {
      setCurrentSession({
        id: sessionsData[0]?.id,
        pOne: sessionsData[0].pOne,
        pTwo: sessionsData[0].pTwo,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        userTwo: sessionsData[0].users.find(
          (u) => u.id !== userSession?.user?.id,
        ),
      });

      firstSet.current = true;
    }
  }, [chatSessions, userSession, sessionsData]);

  return (
    <ChatContext.Provider
      value={{
        sessionsData,
        currentSession,
        setCurrentSession,
        chatSessions,
        setChatSessions,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default function useChat() {
  return useContext(ChatContext);
}
