import { router } from '../trpc';
import { authRouter } from './auth';
import { courseRouter } from './course';
import { userRouter } from './user';

export const appRouter = router({
  auth: authRouter,
  course: courseRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
