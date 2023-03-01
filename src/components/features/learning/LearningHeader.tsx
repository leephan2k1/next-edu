import { Tooltip, TooltipAnchor, useTooltipState } from 'ariakit/tooltip';
import { useSetAtom } from 'jotai';
import { courseContentBarState } from '~/atoms/courseContentBarState';

import { DocumentMinusIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { listNoteModalState } from '~/atoms/listNoteModal';
import Logo from '../../partials/Logo';
import usePreviousRoute from '~/contexts/HistoryRouteContext';
import { useRouter } from 'next/router';

interface LearningHeaderProps {
  courseName: string;
  learningPercentage: number;
}

export default function LearningHeader({
  courseName,
  learningPercentage,
}: LearningHeaderProps) {
  const prevRoute = usePreviousRoute();
  const router = useRouter();

  const tooltip = useTooltipState();
  const setListNodeOpen = useSetAtom(listNoteModalState);
  const setCourseContentsBarOpen = useSetAtom(courseContentBarState);

  return (
    <header className="w-full bg-white p-4 dark:bg-dark-background">
      <nav className="mx-auto flex w-full justify-between md:max-w-[720px] lg:max-w-[1200px]">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push(prevRoute?.url || '/')}
            className="btn-circle"
          >
            <ChevronLeftIcon className="h-6 w-6 md:h-8 md:w-8" />
          </button>

          <Logo customStyles="md:block hidden" />

          <h1 className="font-bold line-clamp-1 md:max-w-[60%]">
            {courseName}
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <div
            className="radial-progress scale-75 p-1"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            style={{ '--value': learningPercentage }}
          >
            {learningPercentage}%
          </div>
          <TooltipAnchor state={tooltip} className="button secondary">
            <button
              onClick={() => setListNodeOpen(true)}
              className="btn-link btn py-2"
            >
              <DocumentMinusIcon className="h-6 text-yellow-500 md:h-8 md:w-8" />
            </button>
          </TooltipAnchor>
          <Tooltip
            state={tooltip}
            className="tooltip z-[100] rounded-xl bg-primary p-2 text-gray-600"
          >
            Ghi chú
          </Tooltip>
          <button
            onClick={() => setCourseContentsBarOpen(true)}
            className="hidden px-3 py-2 lg:block"
          >
            <Bars3Icon className="h-6 text-gray-700 dark:text-white/70 md:h-8 md:w-8" />
          </button>
        </div>
      </nav>
    </header>
  );
}
