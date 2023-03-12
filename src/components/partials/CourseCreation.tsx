import { PencilIcon } from '@heroicons/react/24/outline';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import { useAtomValue, useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FiSave } from 'react-icons/fi';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { useIsFirstRender } from 'usehooks-ts';
import { createCourseSteps } from '~/atoms/createCourseSteps';
import { PATHS } from '~/constants';
import useCourse from '~/contexts/CourseContext';
import CourseCreationContents from '../features/teaching/CourseCreationContents';
import CourseCreationInfo from '../features/teaching/CourseCreationInfo';
import CoursePublishing from '../features/teaching/CoursePublishing';
import { trpc } from '~/utils/trpc';
import { lecturesContents } from '~/atoms/lecturesContents';
import Loading from '../buttons/Loading';
import { useSession } from 'next-auth/react';
import ConfirmPublishCourseModal from './ConfirmPublishCourseModal';

export default function CourseCreation() {
  const { data: session } = useSession();

  const createSteps = useAtomValue(createCourseSteps);
  const setLecturesContents = useSetAtom(lecturesContents);

  const courseCtx = useCourse();
  const router = useRouter();
  const firstMount = useIsFirstRender();

  const [shouldMountModal, setShouldMountModel] = useState(false);

  const { data: course, isLoading } = trpc.course.findCourseBySlug.useQuery(
    { slug: router.query?.slug as string, userId: session?.user?.id },
    { enabled: !!router.query?.slug },
  );

  // console.log('course:: ', course);

  useEffect(() => {
    if (firstMount) {
      courseCtx?.resetCourse();
    }

    return () => {
      setLecturesContents([]);
    };
  }, [firstMount]);

  return (
    <>
      <ConfirmPublishCourseModal
        isOpen={shouldMountModal}
        setIsOpen={setShouldMountModel}
      />

      <div className="flex min-h-screen flex-col space-y-14 pt-[7rem] pb-[10rem] md:pb-[7rem] md:pt-[5rem]">
        <div className="md:w-[80% mx-auto flex w-[90%] flex-col">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="mb-10 flex items-center space-x-4 text-3xl">
              <PencilIcon className="h-8 w-8" />{' '}
              <span className="font-bold">Thiết kế khoá học</span>
            </h1>

            <button
              onClick={() => {
                router.push(`/${PATHS.TEACHING}/${PATHS.COURSE}`);
              }}
              className="smooth-effect flex w-fit items-center space-x-2 rounded-xl bg-yellow-400 px-4 py-3 text-gray-600"
            >
              <span>Trở về</span>
              <ArrowUturnLeftIcon className="h-8 w-8" />
            </button>
          </div>

          <ul className="steps sticky top-0 z-[300] mx-auto mb-4 w-full gap-x-4 overflow-x-scroll rounded-xl bg-white dark:bg-dark-background">
            <li className={`smooth-effect step-primary step`}>
              Thông tin cơ bản
            </li>
            <li
              className={`smooth-effect step ${
                createSteps >= 2 && 'step-primary'
              }`}
            >
              Thiết kế nội dung
            </li>
            <li
              className={`smooth-effect step ${
                createSteps >= 3 && 'step-primary'
              }`}
            >
              Phát hành khoá học
            </li>
          </ul>

          {isLoading && router.query?.slug ? (
            <div className="absolute-center overflow-hidden">
              <Loading styles="w-10 h-10" />
            </div>
          ) : (
            <>
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <CourseCreationInfo course={course} />

              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <CourseCreationContents course={course} />

              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <CoursePublishing course={course} />
            </>
          )}
        </div>

        <div className="fixed bottom-10 right-10 z-[350] flex items-center space-x-4">
          <button
            onClick={() => {
              courseCtx?.dispatch();
            }}
            className="smooth-effect group flex items-center space-x-4 rounded-xl border border-gray-600 bg-gray-600 p-4 text-white dark:border-white dark:bg-dark-background dark:text-white"
          >
            <FiSave className="smooth-effect h-8 w-8 group-hover:scale-125" />
            <span>Lưu tiến trình</span>
          </button>
          <button
            onClick={() => {
              courseCtx?.dispatch();
              setShouldMountModel(true);
            }}
            className="smooth-effect group flex items-center space-x-4 rounded-xl border border-gray-600 bg-yellow-200 p-4 dark:border-white dark:text-black"
          >
            <HiOutlineSpeakerphone className="smooth-effect h-8 w-8 group-hover:scale-125" />
            <span>Phát hành</span>
          </button>
        </div>
      </div>
    </>
  );
}
