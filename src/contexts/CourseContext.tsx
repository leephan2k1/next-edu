import type { Chapter, Course, Lecture, Resource, Cart } from '@prisma/client';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useToggle } from 'usehooks-ts';
import { PATHS } from '~/constants';
import { trpc } from '~/utils/trpc';

import type { ReactNode } from 'react';
type ResourceType = Omit<Resource, 'id' | 'createdAt' | 'lectureId'>;

interface LectureType extends Omit<Partial<Lecture>, 'id' | 'chapterId'> {
  resources: ResourceType[];
}

interface ChapterType extends Omit<Chapter, 'id' | 'courseId'> {
  lectures?: LectureType[];
}

export interface CourseType extends Omit<Course, 'id' | 'categoryId'> {
  category?: { name: string; subCategory: string };
  courseTargets?: string[];
  courseRequirements?: string[];
  chapters: ChapterType[];
}

interface CourseContextValues {
  enrollStatus: 'error' | 'success' | 'idle' | 'loading';
  addCourseToCartStatus: 'error' | 'success' | 'idle' | 'loading';
  course: CourseType | null;
  dispatchUpdate: boolean;
  dispatch: () => void;
  enrollCourse: (courseSlug: string) => void;
  addCourseToCart: (courseId: string) => void;
  updateCourse: (course: Partial<CourseType>) => void;
  resetCourse: () => void;
  userWithCart:
    | {
        cart: Cart[];
      }
    | null
    | undefined;
}

interface CourseContextProps {
  children: ReactNode;
}

const CourseContext = createContext<CourseContextValues | null>(null);

export const CourseContextProvider = ({ children }: CourseContextProps) => {
  const router = useRouter();
  const [dispatchUpdate, toggle] = useToggle();
  const [course, setCourse] = useState<CourseType | null>(null);

  const { data: session, status: sessionStatus } = useSession();

  // console.log('course updating:: ', course);
  const { data: userWithCart, refetch: refetchUserWithCart } =
    trpc.user.findCartByUser.useQuery(undefined, {
      enabled: sessionStatus === 'authenticated',
    });

  const { mutate: enrollCourseMutate, status: enrollStatus } =
    trpc.course.enrollCourse.useMutation();

  const { mutate: addCourseToCartMutate, status: addCourseToCartStatus } =
    trpc.user.addCOurseToCart.useMutation();

  const addCourseToCart = (courseId: string) => {
    if (sessionStatus === 'unauthenticated') {
      router.push(`/${PATHS.LOGIN}`);
      return;
    }

    addCourseToCartMutate({ courseId });
  };

  const updateCourse = (courseParam: Partial<CourseType>) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore

    setCourse((prevState) => {
      return { ...prevState, ...courseParam };
    });
  };

  const enrollCourse = (courseSlug: string) => {
    if (!session?.user?.id) {
      router.push(`/${PATHS.LOGIN}`);
      return;
    }

    enrollCourseMutate({ slug: courseSlug, userId: session?.user?.id });
  };

  // effect notify toast add course to cart
  useEffect(() => {
    if (addCourseToCartStatus === 'success') {
      toast.success('Thêm vào giỏ hàng thành công!');
      refetchUserWithCart();
    }

    if (addCourseToCartStatus === 'error') {
      toast.error('Thêm vào giỏ hàng thất bạn! Thử lại sau!');
    }
  }, [addCourseToCartStatus]);

  // effect notify toast enroll
  useEffect(() => {
    if (enrollStatus === 'success') {
      toast.success('Đăng ký khoá học thành công!');
    }

    if (enrollStatus === 'error') {
      toast.error('Đăng ký khoá học thất bại! Thử lại sau!');
    }
  }, [enrollStatus]);

  // effect create/update course
  useEffect(() => {
    if (course?.name) {
      (async function () {
        try {
          if (!session?.user?.id) throw new Error();

          await axios.post('/api/course/update', {
            ...course,
            userId: session?.user?.id,
          });
        } catch (error) {}
      })();
    }
  }, [course]);

  const resetCourse = () => {
    setCourse(null);
  };

  return (
    <CourseContext.Provider
      value={{
        addCourseToCartStatus,
        userWithCart,
        addCourseToCart,
        enrollStatus,
        dispatchUpdate,
        enrollCourse,
        dispatch: toggle,
        course,
        updateCourse,
        resetCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export default function useCourse() {
  return useContext(CourseContext);
}
