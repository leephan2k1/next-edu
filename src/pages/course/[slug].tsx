import { useSession } from 'next-auth/react';
// import RelatedCourses from '~/components/courses/RelatedCourses';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
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
import BlankCoursePage from '~/components/shared/BlankCoursePage';
import Head from '~/components/shared/Head';

import type { CourseType } from '~/types';
import type { GetServerSideProps, NextPage } from 'next';
import { PATHS } from '~/constants';

interface CoursePageProps {
  courseHasPassword?: boolean;
  verified?: boolean;
  courseImage?: string;
  courseName?: string;
}

const CoursePage: NextPage = ({
  courseHasPassword,
  verified,
  courseImage,
  courseName,
}: CoursePageProps) => {
  const courseCtx = useCourse();
  const router = useRouter();
  const prevRoute = usePreviousRoute();
  const isClient = useIsClient();

  const { status } = useSession();

  const [isUnlocked, setIsUnlocked] = useState(!courseHasPassword);

  const { data: course, refetch } = trpc.course.findCourseBySlug.useQuery(
    { slug: router.query.slug as string },
    { enabled: !!router.query.slug && isUnlocked && verified },
  );

  const { data: wishList, refetch: refetchWishlist } =
    trpc.user.findWishlist.useQuery(
      { includeCourse: false },
      {
        enabled: status === 'authenticated' && isUnlocked,
      },
    );

  const { mutate: addWishCourse, status: addWishCourseStatus } =
    trpc.user.addWishCourse.useMutation();

  const { mutate: deleteWishCourse, status: deleteWishCourseStatus } =
    trpc.user.deleteWishCourse.useMutation();

  useEffect(() => {
    if (deleteWishCourseStatus === 'success') {
      toast.success('Đã xoá khỏi danh sách yêu thích');
      return;
    }
  }, [deleteWishCourseStatus]);

  useEffect(() => {
    if (addWishCourseStatus === 'success') {
      toast.success('Đã thêm vào danh sách yêu thích');
      return;
    }
  }, [addWishCourseStatus]);

  useEffect(() => {
    if (
      addWishCourseStatus === 'success' ||
      deleteWishCourseStatus === 'success'
    ) {
      refetchWishlist();
    }

    if (addWishCourseStatus === 'error' || deleteWishCourseStatus === 'error') {
      toast.error('Có lỗi xảy ra, thử lại sau!');
    }
  }, [addWishCourseStatus, deleteWishCourseStatus]);

  useEffect(() => {
    if (courseCtx?.enrollStatus === 'success') {
      refetch();
    }
  }, [courseCtx?.enrollStatus]);

  const handleAddWishCourse = () => {
    if (status === 'loading' || status === 'unauthenticated') {
      router.push(`/${PATHS.LOGIN}`);
      return;
    }

    if (!course || !course?.id) {
      toast.error('Oops! Có lỗi xảy ra, thử lại sau!');
      return;
    }

    addWishCourse({ courseId: course.id });
  };

  const handleDeleteWishCourse = (wishlistId: string) => {
    deleteWishCourse({ wishlistId });
  };

  const refetchCourse = () => {
    refetch();
  };

  const ratingValue = useMemo(() => {
    if (!course && !course?.reviews) return 0;

    return Math.floor(
      course.reviews.reduce((point, review) => {
        if (review.rating) {
          return point + review.rating;
        }

        return point + 0;
      }, 0) / (course.reviews.length > 0 ? course.reviews.length : 1),
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

  if (!verified) {
    return <BlankCoursePage />;
  }

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
    <>
      <Head
        title={courseName ? `${courseName} - Next Edu` : undefined}
        image={courseImage ? courseImage : undefined}
      />

      <div className="min-h-screen">
        <CourseHeader
          wishlist={wishList || []}
          isLoading={
            addWishCourseStatus === 'loading' ||
            deleteWishCourseStatus === 'loading'
          }
          handleDeleteWishCourse={handleDeleteWishCourse}
          handleAddWishCourse={handleAddWishCourse}
          course={course as CourseType}
          ratingValue={ratingValue}
        >
          <CourseSidebar
            handleDeleteWishCourse={handleDeleteWishCourse}
            isLoading={
              addWishCourseStatus === 'loading' ||
              deleteWishCourseStatus === 'loading'
            }
            wishlist={wishList || []}
            handleAddWishCourse={handleAddWishCourse}
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

            <CourseFooter
              course={course as CourseType}
              refetchCourse={refetchCourse}
            />

            <CommentModal courseId={course?.id} />

            <BuyOnly course={course as CourseType} ratingValue={ratingValue} />
          </>
        ) : null}
      </div>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// middleware check course has a password
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug } = query;

  const course = await prisma?.course.findUnique({
    where: { slug: slug as string },
    select: { password: true, verified: true, thumbnail: true, name: true },
  });

  const courseHasPassword = course?.password !== null;
  const verified = course?.verified === 'APPROVED';

  return {
    props: {
      courseHasPassword,
      verified,
      courseImage: course?.thumbnail,
      courseName: course?.name,
    },
  };
};

export default CoursePage;
