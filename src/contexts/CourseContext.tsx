import { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useToggle } from 'usehooks-ts';

import type { Course } from '@prisma/client';
import type { ReactNode } from 'react';
interface CourseType extends Omit<Course, 'id' | 'categoryId'> {
  category?: { name: string; subCategory: string };
  courseTargets?: string[];
  courseRequirements?: string[];
}

interface CourseContextValues {
  course: CourseType | null;
  dispatchUpdate: boolean;
  dispatch: () => void;
  updateCourse: (course: Partial<CourseType>) => void;
}

interface CourseContextProps {
  children: ReactNode;
}

const CourseContext = createContext<CourseContextValues | null>(null);

export const CourseContextProvider = ({ children }: CourseContextProps) => {
  const [course, setCourse] = useState<CourseType | null>(null);
  const [dispatchUpdate, toggle] = useToggle();

  const updateCourse = (course: Partial<CourseType>) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    setCourse((prevState) => ({ ...prevState, ...course }));
    toast.success('Đã lưu tiến trình');
  };

  return (
    <CourseContext.Provider
      value={{ dispatchUpdate, dispatch: toggle, course, updateCourse }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export default function useCourse() {
  return useContext(CourseContext);
}
