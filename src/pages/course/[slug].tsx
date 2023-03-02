// import RelatedCourses from '~/components/courses/RelatedCourses';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useIsClient } from 'usehooks-ts';
import CourseAchievement from '~/components/courses/CourseAchievement';
import CourseBody from '~/components/courses/CourseBody';
import CourseContent from '~/components/courses/CourseContent';
import CourseDescription from '~/components/courses/CourseDescription';
import CourseFooter from '~/components/courses/CourseFooter';
import CourseHeader from '~/components/courses/CourseHeader';
import CourseRequirements from '~/components/courses/CourseRequirements';
import CourseSidebar from '~/components/courses/CourseSidebar';
import BuyOnly from '~/components/partials/BuyOnly';
import ConfirmCoursePassword from '~/components/partials/ConfirmCoursePassword';
import CommentModal from '~/components/shared/CommentModal';
import useCourse from '~/contexts/CourseContext';
import usePreviousRoute from '~/contexts/HistoryRouteContext';
import { prisma } from '~/server/db/client';
import { trpc } from '~/utils/trpc';

import type { CourseType } from '~/types';
import type { GetServerSideProps, NextPage } from 'next';
interface CoursePageProps {
  courseHasPassword?: boolean;
}

const CoursePage: NextPage = ({ courseHasPassword }: CoursePageProps) => {
  const courseCtx = useCourse();
  const router = useRouter();
  const prevRoute = usePreviousRoute();
  const isClient = useIsClient();

  const [isUnlocked, setIsUnlocked] = useState(!courseHasPassword);

  const { data: course, refetch } = trpc.course.findCourseBySlug.useQuery(
    { slug: router.query.slug as string },
    { enabled: !!router.query.slug && isUnlocked },
  );

  useEffect(() => {
    if (courseCtx?.enrollStatus === 'success') {
      refetch();
    }
  }, [courseCtx?.enrollStatus]);

  const ratingValue = useMemo(() => {
    if (!course) return 0;

    return (
      Math.floor(
        course.reviews.reduce((point, review) => {
          if (review.rating) {
            return point + review.rating;
          }

          return point + 0;
        }, 0),
      ) / (course.reviews.length > 0 ? course.reviews.length : 1)
    );
  }, [course]);

  const totalVideoDuration = useMemo(() => {
    if (course) {
      return course.chapters.reduce((prev, curr) => {
        return (
          prev +
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          curr.lectures?.reduce((time, lecture) => {
            return (
              time +
              lecture.resources.reduce((videoDur, rsc) => {
                if (rsc.type === 'video' && !isNaN(videoDur)) {
                  return videoDur + Number(rsc.videoDuration);
                }

                return videoDur + 0;
              }, 0)
            );
          }, 0)
        );
      }, 0);
    }

    return 0;
  }, [course]);

  const totalLectures = useMemo(() => {
    if (course) {
      return course.chapters.reduce((nChapter, chapter) => {
        if (chapter.lectures) {
          return nChapter + chapter.lectures?.length;
        }

        return nChapter;
      }, 0);
    }
  }, [course]);

  if (
    course &&
    course?.verified !== 'APPROVED' &&
    !course?.published &&
    isClient
  ) {
    router.push(prevRoute?.url || '/');
    return null;
  }

  if (courseHasPassword && !isUnlocked) {
    return <ConfirmCoursePassword setIsUnlocked={setIsUnlocked} />;
  }

  return (
    <div className="min-h-screen">
      <CourseHeader course={course as CourseType} ratingValue={ratingValue}>
        <CourseSidebar
          course={course as CourseType}
          totalVideoDuration={totalVideoDuration}
          totalLectures={totalLectures || 0}
        />
      </CourseHeader>

      {course ? (
        <>
          <CourseBody>
            <CourseAchievement
              targets={course.courseTargets.map((target) => ({
                id: target.id,
                content: target.content,
              }))}
            />
            <CourseContent
              course={course as CourseType}
              totalLectures={totalLectures || 0}
              totalVideoDuration={totalVideoDuration}
            />
            <CourseRequirements
              requirements={course.courseRequirements.map((rq) => ({
                id: rq.id,
                content: rq.content,
              }))}
            />

            <CourseDescription description={course.detailDescription || ''} />
          </CourseBody>

          <CourseFooter />

          <CommentModal />

          <BuyOnly course={course as CourseType} ratingValue={ratingValue} />
        </>
      ) : null}
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// middleware check course has a password
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug } = query;

  const course = await prisma?.course.findUnique({
    where: { slug: slug as string },
    select: { password: true },
  });

  const courseHasPassword = course?.password !== null;

  return {
    props: { courseHasPassword },
  };
};

export default CoursePage;
