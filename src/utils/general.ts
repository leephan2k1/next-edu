import type { LectureType, Progress } from '~/types';

export function unlockLectureHelper(
  progressByCourse: Progress[],
  allLecturesByChapters: LectureType[],
) {
  const latestLecture = [...progressByCourse].pop();

  const currentLatestLecture = allLecturesByChapters.findIndex(
    (lc) => lc.id === latestLecture?.id,
  );

  if (allLecturesByChapters[currentLatestLecture + 1]) {
    return allLecturesByChapters[currentLatestLecture + 1];
  }

  return null;
}
