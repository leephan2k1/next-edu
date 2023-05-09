import type { Category, Review } from '@prisma/client';
import type { GetStaticProps, NextPage } from 'next';
import Achievement from '~/components/partials/Achievement';
import Banner from '~/components/partials/Banner';
import PopularCourses from '~/components/partials/PopularCourses';
import TeacherBanner from '~/components/partials/TeacherBanner';
import TopCategories from '~/components/partials/TopCategories';
import Container from '~/components/shared/Container';
import { prisma } from '~/server/db/client';
import Testimonial from '~/components/partials/Testimonial';
import Head from '~/components/shared/Head';
import { trpc } from '~/utils/trpc';

interface HomePageProps {
  topCategories: Category[];

  totalCourses: number;
  totalStudents: number;
  totalInstructors: number;
}

const Home: NextPage<HomePageProps> = ({
  topCategories,
  totalCourses,
  totalStudents,
  totalInstructors,
}) => {
  const { data: latestReviews } = trpc.review.getLatestReviews.useQuery<
    (Review & {
      Course: {
        slug: string;
      } | null;
    })[]
  >();

  return (
    <>
      <Head />

      <Banner />

      <Container>
        <PopularCourses />
      </Container>

      <Achievement
        totalCourses={totalCourses}
        totalInstructors={totalInstructors}
        totalStudents={totalStudents}
      />

      <Container>
        <TeacherBanner />

        <TopCategories categories={topCategories} />

        {latestReviews && latestReviews.length > 0 && (
          <Testimonial latestReviews={latestReviews} />
        )}
      </Container>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getStaticProps: GetStaticProps = async () => {
  const [topCategories, totalCourses, totalStudents, totalInstructors] =
    await prisma.$transaction([
      prisma.course.findMany({
        where: { students: { some: { id: { not: undefined } } } },
        select: {
          category: true,
        },
        distinct: ['categoryId'],
        take: 4,
        orderBy: { students: { _count: 'desc' } },
      }),
      prisma.course.count({
        where: { verified: 'APPROVED' },
      }),
      prisma.student.count(),
      // -> prisma doesn't support count distinct :? https://github.com/prisma/prisma/issues/4228
      prisma.$queryRaw`SELECT COUNT(DISTINCT userId) FROM Course`,
    ]);

  return {
    props: {
      topCategories: topCategories.map((e) => e.category),
      totalCourses,
      totalStudents,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      totalInstructors: Number(totalInstructors[0]['count(distinct userId)']),
    },
    revalidate: 60 * 60 * 6, // 6h
  };
};

export default Home;
