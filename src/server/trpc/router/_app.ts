import { router } from '../trpc';
import { authRouter } from './auth';
import { courseRouter } from './course';
import { userRouter } from './user';
import { lectureRouter } from './lecture';
import { chatRouter } from './chat';

export const appRouter = router({
  auth: authRouter,
  course: courseRouter,
  lecture: lectureRouter,
  user: userRouter,
  chat: chatRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
