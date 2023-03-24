import { z } from 'zod';

import { protectedProcedure, router } from '../trpc';

export const chatRouter = router({
  findSessions: protectedProcedure.query(async ({ ctx }) => {
    // p1
    const sessions = await ctx.prisma.chatSession.findMany({
      where: { pOne: ctx.session.user.id },
      include: {
        users: { select: { id: true, name: true, image: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    // p2 (query if message > 0)
    if (sessions.length === 0) {
      return await ctx.prisma.chatSession.findMany({
        where: {
          pTwo: ctx.session.user.id,
          messages: {
            some: { id: { not: undefined } },
          },
        },
        include: {
          users: { select: { id: true, name: true, image: true } },
        },
        orderBy: { createdAt: 'desc' },
      });
    }

    return sessions;
  }),

  findSession: protectedProcedure
    .input(z.object({ userIdOne: z.string(), userIdTwo: z.string() }))
    .query(async ({ ctx, input }) => {
      const { userIdOne, userIdTwo } = input;

      const session = await ctx.prisma.chatSession.findUnique({
        where: {
          pOne_pTwo: {
            pOne: userIdOne,
            pTwo: userIdTwo,
          },
        },
        include: {
          messages: {
            include: {
              user: { select: { id: true, name: true, image: true } },
            },
            orderBy: { createdAt: 'asc' },
          },
        },
      });

      return session;
    }),

  createChatSession: protectedProcedure
    .input(z.object({ userIdOne: z.string(), userIdTwo: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userIdOne, userIdTwo } = input;

      const chatSession = await ctx.prisma.chatSession.upsert({
        where: {
          pOne_pTwo: {
            pOne: userIdOne,
            pTwo: userIdTwo,
          },
        },
        update: {
          pOne: userIdOne,
          pTwo: userIdTwo,
          users: { connect: [{ id: userIdOne }, { id: userIdTwo }] },
        },
        create: {
          pOne: userIdOne,
          pTwo: userIdTwo,
          users: { connect: [{ id: userIdOne }, { id: userIdTwo }] },
        },
      });

      return chatSession;
    }),
});
