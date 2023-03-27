// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { getVideoDurationInSeconds } from 'get-video-duration';
import type { ChapterType } from '~/types';

export async function computeVideoDuration(chapters: ChapterType[]) {
  const supportedFFmpeg = Boolean(process.env.SUPPORTED_FFMPEG);

  for (let i = 0; i < chapters.length; i++) {
    if (Array.isArray(chapters[i]?.lectures)) {
      for (let j = 0; j < chapters[i]?.lectures?.length; j++) {
        for (let k = 0; k < chapters[i]?.lectures[j]?.resources.length; k++) {
          if (chapters[i]?.lectures[j]?.resources[k]?.type === 'video') {
            let duration;

            if (supportedFFmpeg) {
              duration = await getVideoDurationInSeconds(
                chapters[i]?.lectures[j]?.resources[k]?.url,
              );
            } else {
              //random number for fun:
              duration = Math.floor(Math.random() * 10) + 1;
            }

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
