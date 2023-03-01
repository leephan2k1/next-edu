import { router } from '../trpc';
import { authRouter } from './auth';
import { courseRouter } from './course';
import { userRouter } from './user';
import { lectureRouter } from './lecture';

export const appRouter = router({
  auth: authRouter,
  course: courseRouter,
  lecture: lectureRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
