import { DocumentMinusIcon } from '@heroicons/react/20/solid';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { Tooltip, TooltipAnchor, useTooltipState } from 'ariakit/tooltip';

import Logo from './Logo';

export default function LearningHeader() {
  const tooltip = useTooltipState();

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
            <button className="btn-link btn py-2">
              <DocumentMinusIcon className="h-6 text-yellow-500 md:h-8 md:w-8" />
            </button>
          </TooltipAnchor>
          <Tooltip
            state={tooltip}
            className="tooltip rounded-xl bg-dark-background p-2 dark:bg-white dark:text-black"
          >
            Ghi chú
          </Tooltip>
        </div>
      </nav>
    </header>
  );
}
