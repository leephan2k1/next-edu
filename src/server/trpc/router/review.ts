import { publicProcedure, router } from '../trpc';

export const reviewRouter = router({
  getLatestReviews: publicProcedure.query(async ({ ctx }) => {
    const latestReviews = await ctx.prisma.review.findMany({
      take: 8,
      orderBy: { createdAt: 'desc' },
      include: { Course: { select: { slug: true } }, author: true },
    });

    return latestReviews;
  }),
});
