import { Disclosure, useDisclosureState } from 'ariakit/disclosure';
import { memo, useEffect } from 'react';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { DocumentTextIcon, PlayCircleIcon } from '@heroicons/react/24/solid';

import type { ChapterType, LectureType } from '~/types';

const Lesson = ({ lecture }: { lecture: LectureType }) => {
  const selectIcon = () => {
    if (lecture.resources.find((rsc) => rsc.type === 'video')) {
      return (
        <PlayCircleIcon className="inline-block h-6 w-6 text-yellow-500" />
      );
    }

    return <DocumentTextIcon className="inline-block h-6 w-6 text-gray-500" />;
  };

  return (
    <li className="flex items-center space-x-4 line-clamp-1">
      <span>{selectIcon()}</span>
      <span>{lecture.title}</span>{' '}
      {lecture.isPreview && (
        <span className="cursor-pointer text-blue-500">xem trước</span>
      )}
    </li>
  );
};

interface ChapterDisclosureProps {
  expand?: boolean;
  chapter: ChapterType;
}

function ChapterDisclosure({ expand, chapter }: ChapterDisclosureProps) {
  const [animationParent] = useAutoAnimate<HTMLDivElement>();
  const disclosure = useDisclosureState();

  useEffect(() => {
    disclosure.setOpen(!!expand);
  }, [expand]);

  return (
    <div>
      <Disclosure
        state={disclosure}
        className="smooth-effect flex w-full justify-between rounded-lg bg-white p-4 text-left text-2xl text-yellow-900 hover:bg-yellow-200 focus:outline-none focus-visible:ring focus-visible:ring-yellow-500 focus-visible:ring-opacity-75 dark:bg-dark-background dark:text-white/70"
      >
        <span className="max-w-[50%] line-clamp-1">{chapter.title}</span>
        <div className="flex space-x-4">
          <span>{chapter.lectures?.length} bài học</span>
          <ChevronUpIcon
            className={`${
              disclosure.open ? 'rotate-180 transform' : ''
            } smooth-effect h-5 w-5 text-gray-800 dark:text-white`}
          />
        </div>
      </Disclosure>

      <div ref={animationParent} className="my-4">
        {disclosure.open && (
          <ul className="flex w-full flex-col space-y-8 px-6">
            {chapter.lectures &&
              chapter.lectures.length > 0 &&
              chapter.lectures.map((lecture) => {
                return <Lesson key={lecture.id} lecture={lecture} />;
              })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default memo(ChapterDisclosure);
