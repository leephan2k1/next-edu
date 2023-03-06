import { z } from 'zod';
import { router, protectedProcedure, publicProcedure } from '../trpc';
import exclude from '~/server/helper/excludeFields';

export const courseRouter = router({
  checkCoursePassword: publicProcedure
    .input(z.object({ password: z.string(), courseSlug: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { password, courseSlug } = input;

      const courseWithPassword = await ctx.prisma.course.findUnique({
        where: { slug: courseSlug },
        select: { password: true },
      });

      if (password === courseWithPassword?.password) {
        return true;
      }

      return false;
    }),

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

  findAnnouncements: publicProcedure
    .input(z.object({ courseId: z.string() }))
    .query(async ({ input, ctx }) => {
      const { courseId } = input;

      const announcements = await ctx.prisma.announcement.findMany({
        where: { courseId },
        orderBy: { createdAt: 'desc' },
      });

      return announcements;
    }),

  deleteAnnouncement: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = input;

      const deletedAnnouncement = await ctx.prisma.announcement.delete({
        where: { id },
      });

      return deletedAnnouncement;
    }),

  updateAnnouncement: protectedProcedure
    .input(z.object({ id: z.string(), content: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id, content } = input;

      const updatedAnnouncement = await ctx.prisma.announcement.update({
        where: { id },
        data: { content },
      });

      return updatedAnnouncement;
    }),

  createAnnouncement: protectedProcedure
    .input(z.object({ content: z.string(), id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { content, id } = input;

      const courseWithAnnouncement = await ctx.prisma.course.update({
        where: { id },
        data: {
          announcements: {
            create: {
              content,
            },
          },
        },
      });

      return courseWithAnnouncement;
    }),

  findWaitingListCourses: protectedProcedure
    .input(
      z.object({
        verified: z.union([
          z.literal('APPROVED'),
          z.literal('PENDING'),
          z.literal('REJECT'),
        ]),
        published: z.boolean(),
        userId: z.string().optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { published, verified, userId } = input;

      const conditions = { published, verified };

      if (userId) {
        Object.assign(conditions, { ...conditions, userId });
      }

      const courses = await ctx.prisma.course.findMany({
        where: conditions,
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
        orderBy: { updatedAt: 'asc' },
      });

      return courses;
    }),

  verifyCourse: protectedProcedure
    .input(
      z.object({
        verified: z.union([
          z.literal('APPROVED'),
          z.literal('PENDING'),
          z.literal('REJECT'),
        ]),
        coursesId: z.array(z.string()),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { coursesId, verified } = input;

      const courses = await Promise.allSettled(
        coursesId.map(async (id) => {
          return await ctx.prisma.course.update({
            where: { id },
            data: { verified },
          });
        }),
      );

      return courses;
    }),

  enrollCourse: protectedProcedure
    .input(z.object({ slug: z.string(), userId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { slug, userId } = input;

      const student = await ctx.prisma.student.upsert({
        where: { userId },
        update: { courses: { connect: [{ slug }] } },
        create: {
          userId,
          courses: { connect: [{ slug }] },
        },
      });

      return student;
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
