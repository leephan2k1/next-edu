import { router } from '../trpc';
import { authRouter } from './auth';
import { courseRouter } from './course';

export const appRouter = router({
  auth: authRouter,
  course: courseRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
