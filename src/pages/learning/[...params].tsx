import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';
import { useIsClient } from 'usehooks-ts';
import CourseContentCollapse from '~/components/features/learning/CourseContentCollapse';
import CourseContentsBar from '~/components/features/learning/CourseContentsBar';
import LearningBody from '~/components/features/learning/LearningBody';
import LearningHeader from '~/components/features/learning/LearningHeader';
import ListNoteModal from '~/components/features/note/ListNoteModal';
import MainLayout from '~/components/layouts/MainLayout';
import { PATHS } from '~/constants';
import { trpc } from '~/utils/trpc';

import type { ReactNode } from 'react';
import type { CourseType, Progress } from '~/types';

const LearningPage: NextPage = () => {
  const router = useRouter();
  const isClient = useIsClient();
  const { data: session } = useSession();

  const courseSlug = useMemo(() => {
    if (router.query.params?.length) {
      return router.query.params[0];
    }

    return '';
  }, [router.query]);

  const { data: course, isSuccess } = trpc.course.findCourseBySlug.useQuery({
    slug: courseSlug as string,
  });

  const { mutate: updateProgress, isSuccess: isSuccessUpdateProgress } =
    trpc.lecture.updateProgress.useMutation();

  const {
    data: studentProgress,
    isLoading: isLoadingProgress,
    refetch: refetchProgress,
  } = trpc.lecture.findProgressByStudent.useQuery(
    {
      userId: session?.user?.id as string,
      courseSlug: router.query.params ? String(router.query.params[0]) : '',
    },
    { enabled: !!session?.user?.id },
  );

  useEffect(() => {
    const userId = session?.user?.id;
    if (!userId) return;

    if (router.query.params && router.query.params.length > 1) {
      const courseSlug = router.query.params[0];
      const lectureId = router.query.params[1];
      if (!courseSlug || !lectureId) return;

      updateProgress({ userId, courseSlug, lectureId });
    }
  }, [router.query, session?.user]);

  useEffect(() => {
    if (isSuccessUpdateProgress) {
      refetchProgress();
    }
  }, [isSuccessUpdateProgress]);

  const progressByCourse = useMemo<Progress[]>(() => {
    if (router.query.params && router.query.params.length > 0) {
      const courseSlug = router.query.params[0];
      const progressBCourse = studentProgress?.progress.find(
        (course) => course.courseSlug === courseSlug,
      );

      if (progressBCourse) return progressBCourse.Lecture;
    }
    return [];
  }, [studentProgress]);

  // This value serves to determine the next lecture to be unlocked
  const allLecturesByChapters = useMemo(() => {
    if (course?.chapters) {
      return course.chapters.reduce((acc, chapter) => {
        return acc.concat(
          chapter.lectures.reduce((acc, lecture) => {
            return acc.concat(lecture);
          }, []),
        );
      }, []);
    }
    return [];
  }, [course]);

  const handleNavigateLecture = useCallback(
    (lectureId: string) => {
      if (!course?.slug) return;

      router.replace(
        `/${PATHS.LEARNING}/${course.slug}/${lectureId}`,
        undefined,
        { shallow: true },
      );
    },
    [progressByCourse],
  );

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
            <CourseContentsBar>
              {course?.chapters &&
                course?.chapters.length > 0 &&
                course?.chapters.map((chapter) => {
                  return (
                    <CourseContentCollapse
                      handleNavigateLecture={handleNavigateLecture}
                      allLecturesByChapters={allLecturesByChapters}
                      isLoadingProgress={isLoadingProgress}
                      progressByCourse={progressByCourse}
                      key={chapter.id}
                      chapter={chapter}
                    />
                  );
                })}
            </CourseContentsBar>

            <LearningHeader
              courseName={course?.name}
              learningPercentage={Math.trunc(
                Number(progressByCourse.length / allLecturesByChapters.length) *
                  100,
              )}
            />

            <LearningBody course={course as CourseType} />
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
