import { createContext, useContext } from 'react';
import useLecture from '~/contexts/LearningContext';
import { trpc } from '~/utils/trpc';

import type { Discussion } from '@prisma/client';

import type { ReactNode } from 'react';

interface HsRouteContextType {
  discussions:
    | (Discussion & {
        author: {
          name: string | null;
          image: string | null;
        };
        replies: (Discussion & {
          author: {
            name: string | null;
            image: string | null;
          };
        })[];
      })[]
    | undefined;

  refetch: () => void;
}

interface DiscussionContextContextProps {
  children: ReactNode;
}

const DiscussionContext = createContext<HsRouteContextType | null>(null);

export const DiscussionContextProvider = ({
  children,
}: DiscussionContextContextProps) => {
  const lectureCtx = useLecture();

  const { data: discussions, refetch } = trpc.user.findDiscussions.useQuery(
    {
      lectureId: lectureCtx?.currentLecture?.id || '',
    },
    { enabled: !!lectureCtx?.currentLecture?.id },
  );

  return (
    <DiscussionContext.Provider
      value={{
        discussions,
        refetch: () => {
          refetch();
        },
      }}
    >
      {children}
    </DiscussionContext.Provider>
  );
};

export default function useDiscussion() {
  return useContext(DiscussionContext);
}
