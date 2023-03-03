import { z } from 'zod';
import { protectedProcedure, router } from '../trpc';

export const lectureRouter = router({
  updateProgress: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        courseSlug: z.string(),
        lectureId: z.string(),
        studentId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { userId, courseSlug, lectureId, studentId } = input;

      const progress = await ctx.prisma.student.update({
        where: { userId },
        data: {
          progress: {
            upsert: {
              where: { id: `${studentId}_${courseSlug}` },
              update: {
                Lecture: { connect: [{ id: lectureId }] },
              },
              create: {
                id: `${studentId}_${courseSlug}`,
                courseSlug,
                Lecture: { connect: [{ id: lectureId }] },
              },
            },
          },
        },
      });

      return progress;
    }),

  findProgressByStudent: protectedProcedure
    .input(z.object({ userId: z.string(), courseSlug: z.string() }))
    .query(async ({ input, ctx }) => {
      const { userId, courseSlug } = input;

      const student = await ctx.prisma.student.findUnique({
        where: { userId },
        include: {
          progress: {
            where: { courseSlug },
            include: { Lecture: true },
          },
        },
      });

      return student;
    }),
});
