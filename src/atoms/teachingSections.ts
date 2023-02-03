import { atom } from 'jotai';

export type TeachingSections = 'CourseSummary' | 'CourseCreation';

export const teachingSections = atom<TeachingSections>('CourseSummary');
