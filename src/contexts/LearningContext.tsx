import { createContext, useContext } from 'react';

import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import toast from 'react-hot-toast';
import type { LectureType } from '~/types';
import { PATHS } from '~/constants';

interface LearningContextType {
  allLecturesByChapters: LectureType[];
  handleNavigateLecture: (direction: 'next' | 'prev') => void;
}
interface HsRouteContextProps {
  children: ReactNode;
  allLecturesByChapters: LectureType[];
}

const LearningContext = createContext<LearningContextType | null>(null);

export const LearningContextProvider = ({
  children,
  allLecturesByChapters,
}: HsRouteContextProps) => {
  const router = useRouter();

  const handleNavigateLecture = (direction: 'next' | 'prev') => {
    // bc art player init once so router next paths can't change -> router can't use
    const paths = window.location.pathname.split('/');

    if (paths.length === 4) {
      const courseSlug = paths[2];
      const lectureId = paths[3];

      const currentLectureIdx = allLecturesByChapters.findIndex(
        (lc) => lc.id === lectureId,
      );

      if (direction === 'next') {
        if (allLecturesByChapters[currentLectureIdx + 1]) {
          router.replace(
            `/${PATHS.LEARNING}/${courseSlug}/${
              allLecturesByChapters[currentLectureIdx + 1]?.id
            }`,
            undefined,
            { shallow: true },
          );
        } else {
          toast.error('Đây là bài học cuối cùng!');
        }
      } else {
        if (allLecturesByChapters[currentLectureIdx - 1]) {
          router.replace(
            `/${PATHS.LEARNING}/${courseSlug}/${
              allLecturesByChapters[currentLectureIdx - 1]?.id
            }`,
            undefined,
            { shallow: true },
          );
        } else {
          toast.error('Đây là bài học đầu tiên!');
        }
      }

      // console.log('paths:: ', {
      //   currentLectureIdx,
      // });
    } else {
      toast.error('Đường dẫn không đúng? Thử lại!');
    }
  };

  return (
    <LearningContext.Provider
      value={{
        handleNavigateLecture,
        allLecturesByChapters,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export default function useLecture() {
  return useContext(LearningContext);
}
