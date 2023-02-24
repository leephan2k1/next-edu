import { router } from '../trpc';
import { authRouter } from './auth';
import { exampleRouter } from './example';
import { courseRouter } from './course';

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  course: courseRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
