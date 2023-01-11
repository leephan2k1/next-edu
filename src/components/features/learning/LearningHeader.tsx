import { Tooltip, TooltipAnchor, useTooltipState } from 'ariakit/tooltip';
import { useSetAtom } from 'jotai';
import { courseContentBarState } from '~/atoms/courseContentBarState';

import { DocumentMinusIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { listNoteModalState } from '~/atoms/listNoteModal';
import Logo from '../../partials/Logo';

export default function LearningHeader() {
  const tooltip = useTooltipState();
  const setListNodeOpen = useSetAtom(listNoteModalState);
  const setCourseContentsBarOpen = useSetAtom(courseContentBarState);

  return (
    <header className="w-full bg-white p-4 dark:bg-dark-background">
      <nav className="mx-auto flex w-full justify-between md:max-w-[720px] lg:max-w-[1200px]">
        <div className="flex items-center space-x-4">
          <button className="btn-follow-theme btn-circle btn">
            <ChevronLeftIcon className="h-6 w-6 md:h-8 md:w-8" />
          </button>

          <Logo customStyles="md:block hidden" />

          <h1 className="max-w-[50%] font-bold line-clamp-1 md:max-w-[60%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
            velit voluptatibus suscipit, minima dolores nulla amet nihil
            perferendis nobis voluptas totam dolore reprehenderit iusto
            similique. Pariatur minima numquam laboriosam deserunt?
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <div
            className="radial-progress scale-75"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            style={{ '--value': 70 }}
          >
            70%
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
