import type { Announcement } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Loading from '~/components/buttons/Loading';
import useLecture from '~/contexts/LearningContext';
import AnnouncementItem from './AnnouncementItem';

interface AnnouncementsListProps {
  announcements: Announcement[];
  isLoading: boolean;
  refetch?: () => void;
}

export default function AnnouncementsList({
  announcements,
  isLoading,
  refetch,
}: AnnouncementsListProps) {
  const { data: session } = useSession();
  const lectureCtx = useLecture();

  return (
    <ul className="mx-auto space-y-10 lg:w-3/4">
      {isLoading ? (
        <div className="absolute-center min-h-[10rem] w-full">
          <Loading />
        </div>
      ) : (
        announcements &&
        announcements.length > 0 &&
        announcements.map((announcement) => {
          return (
            <AnnouncementItem
              refetch={refetch}
              key={announcement.id}
              isOwner={lectureCtx?.course?.instructor.id === session?.user?.id}
              instructor={{
                name: lectureCtx?.course?.instructor.name || '',
                image: lectureCtx?.course?.instructor.image || '',
                id: lectureCtx?.course?.instructor.id || '',
              }}
              announcement={announcement}
            />
          );
        })
      )}
    </ul>
  );
}
