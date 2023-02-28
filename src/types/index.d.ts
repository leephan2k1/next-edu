import type {
  Chapter,
  Course,
  Lecture,
  Review,
  Resource,
  VERIFIED_STATE,
  Student,
} from '@prisma/client';

export type VerifiedStateType = VERIFIED_STATE;

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
  reviews: Review[];
  students: Student[];
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
