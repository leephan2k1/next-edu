import { useSession } from 'next-auth/react';
import useLecture from '~/contexts/LearningContext';
import DiscussStandalone from '../discussion/DiscussStandalone';
import AnnouncementsList from './AnnouncementsList';

import { trpc } from '~/utils/trpc';

export default function AnnounceContainer() {
  const lectureCtx = useLecture();
  const { data: session } = useSession();

  const {
    data: announcements,
    isLoading,
    refetch,
  } = trpc.course.findAnnouncements.useQuery(
    {
      courseId: lectureCtx?.course?.id as string,
    },
    { enabled: !!lectureCtx?.course?.id },
  );

  const refetchAnnouncementsList = () => {
    refetch();
  };

  return (
    <div className="p-4">
      {session?.user?.id === lectureCtx?.course?.instructor.id && (
        <DiscussStandalone
          inputType="announcement"
          refetch={refetchAnnouncementsList}
        />
      )}

      <AnnouncementsList
        refetch={refetchAnnouncementsList}
        announcements={announcements || []}
        isLoading={isLoading}
      />
    </div>
  );
}
