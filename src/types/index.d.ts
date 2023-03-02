import type {
  Chapter,
  Course,
  Lecture,
  Review,
  Resource,
  VERIFIED_STATE,
  Student,
  Discussion,
  User,
  Announcement,
} from '@prisma/client';

export interface Progress {
  id: string;
  title: string;
  description: string;
  isPreview: boolean;
  order: number;
  chapterId: string;
}

export type StudentProgressType =
  | (Student & {
      progress: LearningProgress &
        {
          Lecture: Lecture[];
        }[];
    })
  | null
  | undefined;

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
  discussions: Discussion[];
}

export interface ChapterType extends Omit<Chapter, 'id' | 'courseId'> {
  lectures?: LectureType[];
}

export interface CourseType extends Course {
  chapters: ChapterType[];
  reviews: Review[];
  students: Student[];
  instructor: User;
  announcements: Announcement[];
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
