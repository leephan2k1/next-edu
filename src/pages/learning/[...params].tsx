import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useIsClient } from 'usehooks-ts';
import CourseContentsBar from '~/components/features/learning/CourseContentsBar';
import LearningBody from '~/components/features/learning/LearningBody';
import LearningHeader from '~/components/features/learning/LearningHeader';
import ListNoteModal from '~/components/features/note/ListNoteModal';
import MainLayout from '~/components/layouts/MainLayout';
import { trpc } from '~/utils/trpc';

import type { ReactNode } from 'react';
const LearningPage: NextPage = () => {
  const router = useRouter();
  const isClient = useIsClient();

  const courseSlug = useMemo(() => {
    if (router.query.params?.length) {
      return router.query.params[0];
    }

    return '';
  }, [router.query]);

  const { data: course, isSuccess } = trpc.course.findCourseBySlug.useQuery({
    slug: courseSlug as string,
  });

  if (!course && isClient && isSuccess) {
    router.push('/404');
    return null;
  }

  return (
    <>
      <ListNoteModal />
      <div className="flex min-h-screen flex-col text-gray-600 dark:text-white/60">
        {course && (
          <>
            <CourseContentsBar chapters={course?.chapters} />

            <LearningHeader courseName={course?.name} />

            <LearningBody />
          </>
        )}
      </div>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// -> There is no need for a header & a footer.
LearningPage.getLayout = (page: ReactNode) => {
  return <MainLayout>{page}</MainLayout>;
};

export default LearningPage;
