import type { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import CourseHeader from '~/components/courses/CourseHeader';
import BuyOnly from '~/components/partials/BuyOnly';
import CourseBody from '~/components/courses/CourseBody';
import CourseFooter from '~/components/courses/CourseFooter';
import CommentModal from '~/components/shared/CommentModal';
import { prisma } from '~/server/db/client';
import type { CourseType } from '~/types';

interface CoursePageProps {
  course: CourseType;
}

const CoursePage: NextPage<CoursePageProps> = ({ course }) => {
  return (
    <div className="min-h-screen">
      <CourseHeader course={course} />

      {course ? (
        <>
          <CourseBody />

          <CourseFooter />

          <CommentModal />

          <BuyOnly />
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
      instructor: true,
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
