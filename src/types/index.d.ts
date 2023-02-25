import type { Chapter, Course, Lecture, Resource } from '@prisma/client';

export type LearningOptions =
  | 'note'
  | 'discuss'
  | 'tools'
  | 'resources'
  | 'announce';

export type ResourceType = Omit<Resource, 'lectureId' | 'courseSlug'>;

export interface LectureType extends Lecture {
  resources: ResourceType[];
}

export interface ChapterType extends Omit<Chapter, 'id' | 'courseId'> {
  lectures?: LectureType[];
}

export interface CourseType extends Course {
  chapters: ChapterType[];
  category: { id: string; name: string };
  courseTargets: {
    id: string;
    content: string;
    courseSlug: string;
    courseId: string;
  }[];
  courseRequirements: {
    id: string;
    content: string;
    courseSlug: string;
    courseId: string;
  }[];
}
