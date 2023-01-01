import { memo, useEffect } from 'react';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import {
  DocumentTextIcon,
  PlayCircleIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/solid';
import { Disclosure, useDisclosureState } from 'ariakit/disclosure';

const Lesson = ({ iconType }: { iconType: string }) => {
  const selectIcon = (iconType: string) => {
    switch (iconType) {
      case 'play':
        return (
          <PlayCircleIcon className="inline-block h-6 w-6 text-yellow-500" />
        );
      case 'question':
        return (
          <QuestionMarkCircleIcon className="inline-block h-6 w-6 text-gray-500" />
        );
      case 'document':
        return (
          <DocumentTextIcon className="inline-block h-6 w-6 text-gray-500" />
        );
    }
  };

  return (
    <li className="flex items-center space-x-4 line-clamp-1">
      {selectIcon(iconType)}
      <span>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima neque
        quas, vero illum magnam consequatur totam repellendus commodi, iste ex
        at quam numquam nemo? Ab aliquid doloremque at suscipit consequatur?
      </span>
    </li>
  );
};

function ChapterDisclosure({ expand }: { expand?: boolean }) {
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
        <span className="max-w-[50%] line-clamp-1">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum eos
          eum commodi voluptatem recusandae, molestias ullam fugiat. Unde
          voluptates modi ducimus corporis eveniet. Atque quo ea, laudantium
          quod quasi sunt!
        </span>
        <span>10 bài học</span>
        <ChevronUpIcon
          className={`${
            disclosure.open ? 'rotate-180 transform' : ''
          } smooth-effect h-5 w-5 text-gray-800 dark:text-white`}
        />
      </Disclosure>

      <div ref={animationParent} className="my-4">
        {disclosure.open && (
          <ul className="flex w-full flex-col space-y-8 px-6">
            <Lesson iconType="play" />
            <Lesson iconType="play" />
            <Lesson iconType="play" />
            <Lesson iconType="question" />
            <Lesson iconType="question" />
            <Lesson iconType="document" />
            <Lesson iconType="document" />
            <Lesson iconType="document" />
          </ul>
        )}
      </div>
    </div>
  );
}

export default memo(ChapterDisclosure);
