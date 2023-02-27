import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const userRouter = router({
  findUserInfo: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input, ctx }) => {
      const { email } = input;

      const user = await ctx.prisma.user.findUnique({ where: { email } });

      return user;
    }),
});
