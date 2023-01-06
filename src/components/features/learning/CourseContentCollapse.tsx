import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Disclosure } from '@headlessui/react';
import {
  CheckIcon,
  ChevronUpIcon,
  LockClosedIcon,
} from '@heroicons/react/20/solid';
import { PlayCircleIcon } from '@heroicons/react/24/solid';

export default function CourseContentCollapse() {
  const [animationParent] = useAutoAnimate<HTMLDivElement>();

  return (
    <div className="w-full">
      <div className="mx-auto w-full px-2" ref={animationParent}>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full flex-col rounded-xl bg-stone-300 px-4 py-2 text-left text-lg font-medium dark:border-white dark:bg-black md:text-2xl">
                <div className="flex w-full items-center justify-between">
                  1. Giới thiệu
                  <ChevronUpIcon
                    className={`${open ? 'rotate-180 transform' : ''} h-8 w-8`}
                  />
                </div>
                <div className="flex text-base text-gray-400 dark:text-white/60 md:text-xl">
                  <span>0/5</span>
                  <span>| 30:33</span>
                </div>
              </Disclosure.Button>
              <Disclosure.Panel>
                <ul className="mx-auto w-full space-y-6 px-2 py-4 text-lg md:text-xl">
                  <li className="flex flex-col space-y-2 rounded-xl border border-dashed border-gray-500 py-2 px-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-left">
                        1. Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Dolorum laborum .
                      </h3>

                      <span className="rounded-full bg-green-400 p-2">
                        <CheckIcon className="h-3 w-3 text-gray-700" />
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <PlayCircleIcon className="h-6 w-6 text-gray-400" />
                      <span>5:00</span>
                    </div>
                  </li>
                  <li className="flex flex-col space-y-2 rounded-xl border border-dashed border-gray-500 py-2 px-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-left">
                        1. Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Dolorum laborum .
                      </h3>

                      <span className="rounded-full bg-green-400 p-2">
                        <CheckIcon className="h-3 w-3 text-gray-700" />
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <PlayCircleIcon className="h-6 w-6 text-gray-400" />
                      <span>5:00</span>
                    </div>
                  </li>
                  <li className="flex flex-col space-y-2 rounded-xl border border-dashed border-gray-500 py-2 px-4 text-gray-500/60 dark:text-white/50">
                    <div className="flex items-center justify-between">
                      <h3 className="text-left">
                        1. Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Dolorum laborum .
                      </h3>

                      <LockClosedIcon className="h-6 w-6 text-gray-700" />
                    </div>
                    <div className="flex space-x-2">
                      <PlayCircleIcon className="h-6 w-6 text-gray-400" />
                      <span>5:00</span>
                    </div>
                  </li>
                </ul>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
