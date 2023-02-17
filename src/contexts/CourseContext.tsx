import { createContext, useContext, useState } from 'react';
import { useToggle } from 'usehooks-ts';

import type { Chapter, Course, Lecture, Resource } from '@prisma/client';
import type { ReactNode } from 'react';

type ResourceType = Omit<Resource, 'id' | 'createdAt' | 'lectureId'>;

interface LectureType extends Omit<Partial<Lecture>, 'id' | 'chapterId'> {
  resources: ResourceType[];
}

interface ChapterType extends Omit<Chapter, 'id' | 'courseId'> {
  lectures?: LectureType[];
}

interface CourseType extends Omit<Course, 'id' | 'categoryId'> {
  category?: { name: string; subCategory: string };
  courseTargets?: string[];
  courseRequirements?: string[];
  chapters: ChapterType[];
}

interface CourseContextValues {
  course: CourseType | null;
  dispatchUpdate: boolean;
  dispatch: () => void;
  updateCourse: (course: Partial<CourseType>) => void;
  resetCourse: () => void;
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
  };

  const resetCourse = () => {
    setCourse(null);
  };

  return (
    <CourseContext.Provider
      value={{
        dispatchUpdate,
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
