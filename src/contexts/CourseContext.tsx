import type { Chapter, Course, Lecture, Resource } from '@prisma/client';
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
  updateCourseStatus: 'error' | 'success' | 'idle' | 'loading';
  course: CourseType | null;
  dispatchUpdate: boolean;
  dispatch: () => void;
  enrollCourse: (courseSlug: string) => void;
  updateCourse: (course: Partial<CourseType>) => void;
  resetCourse: () => void;
}

interface CourseContextProps {
  children: ReactNode;
}

const CourseContext = createContext<CourseContextValues | null>(null);

export const CourseContextProvider = ({ children }: CourseContextProps) => {
  const router = useRouter();
  const [dispatchUpdate, toggle] = useToggle();
  const [course, setCourse] = useState<CourseType | null>(null);

  const { data: session } = useSession();

  const [updateCourseStatus, setUpdateCourseStatus] = useState<
    'error' | 'success' | 'idle' | 'loading'
  >('idle');

  // console.log('course updating:: ', course);

  const { mutate: enrollCourseMutate, status: enrollStatus } =
    trpc.course.enrollCourse.useMutation();

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
      setUpdateCourseStatus('loading');

      (async function () {
        try {
          if (!session?.user?.id) throw new Error();

          await axios.post('/api/course/update', {
            ...course,
            userId: session?.user?.id,
          });

          setUpdateCourseStatus('success');
        } catch (error) {
          setUpdateCourseStatus('error');
        }
      })();
    }
  }, [course]);

  const resetCourse = () => {
    setCourse(null);
  };

  return (
    <CourseContext.Provider
      value={{
        updateCourseStatus,
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
