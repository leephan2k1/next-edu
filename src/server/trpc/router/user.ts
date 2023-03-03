import { z } from 'zod';
import { publicProcedure, router, protectedProcedure } from '../trpc';

export const userRouter = router({
  findWishlist: protectedProcedure
    .input(z.object({ includeCourse: z.boolean().optional() }))
    .query(async ({ input, ctx }) => {
      const { includeCourse } = input;

      const userWithWishlist = await ctx.prisma.user.findUnique({
        where: { id: ctx.session.user.id },
        select: {
          wishlist: {
            include: { course: !!includeCourse },
          },
        },
      });

      return userWithWishlist?.wishlist;
    }),

  addWishCourse: protectedProcedure
    .input(z.object({ courseId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { courseId } = input;

      const userWithWishCourse = await ctx.prisma.wishlist.upsert({
        where: { courseId },
        update: {
          user: {
            connect: { id: ctx.session.user.id },
          },
        },
        create: {
          courseId,
          user: {
            connect: { id: ctx.session.user.id },
          },
        },
      });

      return userWithWishCourse;
    }),

  deleteWishCourse: protectedProcedure
    .input(z.object({ wishlistId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { wishlistId } = input;

      const userWithoutWishCourse = await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: {
          wishlist: {
            disconnect: { id: wishlistId },
          },
        },
      });

      return userWithoutWishCourse;
    }),

  findUserInfo: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input, ctx }) => {
      const { email } = input;

      const user = await ctx.prisma.user.findUnique({ where: { email } });

      return user;
    }),

  addNote: protectedProcedure
    .input(
      z.object({
        content: z.string(),
        chapterId: z.string(),
        lectureId: z.string(),
        notchedAt: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { content, chapterId, lectureId, notchedAt } = input;

      const noteByUser = await ctx.prisma.note.create({
        data: {
          lectureId,
          content,
          notchedAt,
          chapterId,
          User: { connect: { id: ctx.session.user.id } },
        },
      });

      return noteByUser;
    }),

  updateNote: protectedProcedure
    .input(z.object({ content: z.string(), id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id, content } = input;

      const note = await ctx.prisma.note.update({
        where: { id },
        data: { content },
      });

      return note;
    }),

  deleteNote: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = input;

      const deletedNote = await ctx.prisma.note.delete({
        where: { id },
      });

      return deletedNote;
    }),

  findNotes: protectedProcedure
    .input(
      z.object({
        sort: z.union([z.literal('asc'), z.literal('desc')]),
        chapterId: z.string().optional(),
        lectureId: z.string().optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { chapterId, sort, lectureId } = input;

      const conditions = {};

      if (chapterId) Object.assign(conditions, { ...conditions, chapterId });

      if (lectureId) Object.assign(conditions, { ...conditions, lectureId });

      const notes = await ctx.prisma.note.findMany({
        where: {
          userId: ctx.session.user.id,
          ...conditions,
        },
        orderBy: { createdAt: sort },
      });

      return notes;
    }),
});
