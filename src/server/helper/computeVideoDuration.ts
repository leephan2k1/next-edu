// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { getVideoDurationInSeconds } from 'get-video-duration';
import type { ChapterType } from '~/types';

export async function computeVideoDuration(chapters: ChapterType[]) {
  for (let i = 0; i < chapters.length; i++) {
    if (Array.isArray(chapters[i]?.lectures)) {
      for (let j = 0; j < chapters[i]?.lectures?.length; j++) {
        for (let k = 0; k < chapters[i]?.lectures[j]?.resources.length; k++) {
          if (chapters[i]?.lectures[j]?.resources[k]?.type === 'video') {
            const duration = await getVideoDurationInSeconds(
              chapters[i]?.lectures[j]?.resources[k]?.url,
            );

            Object.assign(chapters[i]?.lectures[j]?.resources[k], {
              ...chapters[i]?.lectures[j]?.resources[k],
              videoDuration: duration,
            });
          }
        }
      }
    }
  }

  return chapters;
}
