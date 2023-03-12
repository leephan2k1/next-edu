import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Link from 'next/link';
import { PATHS } from '~/constants';

interface CollapseProps {
  title: string;
  contents: string[];
}

export default function Collapse({ contents, title }: CollapseProps) {
  const [animationParent] = useAutoAnimate<HTMLDivElement>();

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-md px-2" ref={animationParent}>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg border border-gray-500 px-4 py-2 text-left text-lg font-medium dark:border-white md:text-2xl">
                <span>{title}</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-8 w-8 text-primary`}
                />
              </Disclosure.Button>
              <Disclosure.Panel>
                <ul className="space-y-6 px-2 py-4 text-lg md:text-xl">
                  {contents.length &&
                    contents.map((content, idx) => {
                      return (
                        <li key={content}>
                          <Link
                            className="flex items-center"
                            href={`/${PATHS.BROWSE}?${
                              idx === 0
                                ? `category=${content}`
                                : `subCategory=${content}`
                            }`}
                          >
                            {content}
                            <ChevronRightIcon className="h-6 w-6" />
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
