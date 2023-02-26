import { z } from 'zod';
import { router, protectedProcedure, publicProcedure } from '../trpc';
import exclude from '~/server/helper/excludeFields';

export const courseRouter = router({
  findCoursesByOwner: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
      const { userId } = input;
      const courses = await ctx.prisma.course.findMany({
        where: { userId },
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          slug: true,
          verified: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      return { message: 'success', courses };
    }),

  publishCourse: protectedProcedure
    .input(z.object({ published: z.boolean(), slug: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { slug, published } = input;

      const course = await ctx.prisma.course.update({
        where: { slug },
        data: { published },
      });

      return course;
    }),

  findCourseBySlug: publicProcedure
    .input(z.object({ slug: z.string(), userId: z.string().optional() }))
    .query(async ({ input, ctx }) => {
      const { slug, userId } = input;

      const course = await ctx.prisma.course.findUnique({
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

      //the owner needs to get the password
      if (course && userId === course.userId) {
        return course;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const courseWithoutPassword = exclude(course, ['password']);

      return courseWithoutPassword;
    }),
});
