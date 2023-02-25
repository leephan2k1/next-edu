import { atom } from 'jotai';

export const lecturesContents = atom<
  {
    title: string;
    description: string;
    isPreview: boolean;
    chapterOrder: number;
    order: number;
    resources: { name: string; url: string }[];
  }[]
>([]);
