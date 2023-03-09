import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { Else, If, Then } from 'react-if';
import { useDebounce } from 'usehooks-ts';
import useSearchModalState from '~/atoms/searchModalState';
import { PATHS } from '~/constants';
import { trpc } from '~/utils/trpc';

import { Dialog, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import Loading from '../buttons/Loading';

import type { User } from '@prisma/client';
import type { ChangeEvent } from 'react';
import { useRouter } from 'next/router';

interface ResultItemProps {
  course: {
    instructor: User;
    id: string;
    name: string;
    slug: string;
    thumbnail: string | null;
  };
}

function ResultItem({ course }: ResultItemProps) {
  return (
    <li className="smooth-effect rounded-xl hover:bg-slate-200 dark:hover:bg-white/10">
      <Link
        href={`/${PATHS.COURSE}/${course.slug}`}
        className="flex items-center space-x-2 p-2 md:space-x-3 md:p-4"
      >
        <div className="w-fit">
          <figure className="relative h-20 w-36 overflow-hidden rounded-2xl lg:h-24 lg:w-40">
            <Image
              alt="course-thumbnail"
              fill
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              src={course.thumbnail || ''}
            />
          </figure>
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <h1 className="font-semibold line-clamp-1">{course.name}</h1>
          <h2>{course.instructor.name}</h2>
        </div>
      </Link>
    </li>
  );
}

const SEARCH_LIMIT = 10;

export default function SearchModal() {
  const [isOpen, setIsOpen] = useSearchModalState();
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 500);

  const router = useRouter();

  const { data: courses, status: searchStatus } =
    trpc.course.findCoursesByName.useQuery(
      { name: debouncedValue, limit: SEARCH_LIMIT },
      { enabled: !!debouncedValue },
    );

  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setValue('');
    }

    return () => {
      setValue('');
    };
  }, [isOpen]);

  function closeModal() {
    setIsOpen(false);
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[500]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed top-28 left-1/2 -translate-x-1/2 overflow-y-auto text-black dark:text-white">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="smooth-effect max-h-[80vh] w-[90vw] transform space-y-6 overflow-x-hidden overflow-y-scroll rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-dark-background dark:shadow-white/5 md:w-[60vw] lg:w-[75vw]">
                  <div className="flex items-center space-x-4 px-4">
                    <MagnifyingGlassIcon className="h-10 w-10" />
                    <input
                      autoFocus={isOpen}
                      value={value}
                      onChange={handleChange}
                      type="text"
                      placeholder="Tìm kiếm khoá học..."
                      className="w-full bg-transparent p-3"
                    />
                  </div>

                  <If condition={searchStatus === 'loading' && value !== ''}>
                    <Then>
                      <div className="absolute-center min-h-[5rem] w-full">
                        <Loading styles="w-8 h-8" />
                      </div>
                    </Then>
                    <Else>
                      <ul className="space-y-4">
                        {courses &&
                          courses.length > 0 &&
                          courses.map((course) => {
                            return (
                              <ResultItem key={course.id} course={course} />
                            );
                          })}
                      </ul>
                    </Else>
                  </If>

                  {courses && courses.length === SEARCH_LIMIT && (
                    <div className="absolute-center w-full">
                      <button className="rounded-xl bg-slate-200 p-4 text-black dark:bg-black dark:text-white">
                        Xem thêm
                      </button>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
