import type { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import CourseHeader from '~/components/courses/CourseHeader';
import BuyOnly from '~/components/partials/BuyOnly';
import CourseBody from '~/components/courses/CourseBody';
import CourseFooter from '~/components/courses/CourseFooter';
import CommentModal from '~/components/shared/CommentModal';
import { prisma } from '~/server/db/client';
import { useMemo } from 'react';

import type { CourseType } from '~/types';
import CourseAchievement from '~/components/courses/CourseAchievement';
import CourseContent from '~/components/courses/CourseContent';
import CourseRequirements from '~/components/courses/CourseRequirements';
import CourseDescription from '~/components/courses/CourseDescription';
// import RelatedCourses from '~/components/courses/RelatedCourses';
import CourseSidebar from '~/components/courses/CourseSidebar';

interface CoursePageProps {
  course: CourseType;
}

const CoursePage: NextPage<CoursePageProps> = ({ course }) => {
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

  return (
    <div className="min-h-screen">
      <CourseHeader course={course} ratingValue={ratingValue}>
        <CourseSidebar
          course={course}
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
              course={course}
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

          <BuyOnly course={course} ratingValue={ratingValue} />
        </>
      ) : null}
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { slug } = params;

  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      courseTargets: { distinct: ['content'] },
      courseRequirements: { distinct: ['content'] },
      chapters: {
        include: {
          lectures: {
            include: {
              resources: true,
              discussions: true,
              learnedBy: true,
            },
          },
        },
      },
      reviews: true,
      students: true,
      instructor: { include: { bio: true } },
      category: true,
    },
  });

  if (!course) return { notFound: true };

  return {
    props: { course: JSON.parse(JSON.stringify(course)) },
    revalidate: 60 * 60 * 12, //12h
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true };
};

export default CoursePage;
