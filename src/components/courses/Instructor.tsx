import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { BookOpenIcon, UsersIcon } from '@heroicons/react/24/solid';
import { Disclosure, useDisclosureState } from 'ariakit/disclosure';
import Image from 'next/image';
import { memo, useEffect, useMemo, useState } from 'react';
import { GiAchievement } from 'react-icons/gi';
import { trpc } from '~/utils/trpc';
import Link from 'next/link';
import { PATHS } from '~/constants';

interface InstructorProps {
  instructorId?: string;
}

function Instructor({ instructorId }: InstructorProps) {
  const disclosure = useDisclosureState();
  const [isOverflow, setIsOverflow] = useState(false);
  const [parent] = useAutoAnimate<HTMLParagraphElement>();

  const { data: instructor } = trpc.user.findInstructor.useQuery(
    { userId: instructorId as string },
    { enabled: !!instructorId },
  );

  useEffect(() => {
    parent.current && setIsOverflow(parent.current?.clientHeight > 50);
  }, [instructor?.bio?.bioDescription]);

  const totalStudents = useMemo(() => {
    if (!instructor) return 0;

    return instructor.Course.reduce((acc, course) => {
      return acc + course.students.length;
    }, 0);
  }, [instructor]);

  const totalReviews = useMemo(() => {
    if (!instructor) return 0;

    return instructor.Course.reduce((acc, course) => {
      return acc + course.reviews.length;
    }, 0);
  }, [instructor]);

  return (
    <div className="flex w-full flex-col space-y-4">
      <Link href={`/${PATHS.USER}/${instructor?.id}`}>
        <h1 className="max-w-[70%] text-2xl text-yellow-500 line-clamp-1 md:max-w-[50%] md:text-3xl">
          {instructor?.name}
        </h1>
      </Link>

      <div className="mt-4 flex space-x-4">
        <Link href={`/${PATHS.USER}/${instructor?.id}`}>
          <figure className="relative h-[7rem] w-[7rem] overflow-hidden rounded-full md:h-[10rem] md:w-[10rem]">
            <Image
              src={instructor?.image || ''}
              fill
              alt="user-avatar"
              className="absolute inset-0 bg-center bg-no-repeat"
            />
          </figure>
        </Link>

        <div className="flex cursor-pointer flex-col justify-center space-y-2 text-xl md:text-2xl">
          <Link href={`/${PATHS.USER}/${instructor?.id}`}>
            {/* <div className="flex items-center space-x-4">
            <StarIcon className="h-6 w-6" />
            <span>5.0 xếp hạng</span>
          </div> */}
            <div className="flex items-center space-x-4">
              <GiAchievement className="h-6 w-6" />
              <span>{totalReviews} đánh giá</span>
            </div>
            <div className="flex items-center space-x-4">
              <UsersIcon className="h-6 w-6" />
              <span>{totalStudents} học viên</span>
            </div>
            <div className="flex items-center space-x-4">
              <BookOpenIcon className="h-6 w-6" />
              <span>{instructor?.Course.length} khoá học</span>
            </div>
          </Link>
        </div>
      </div>

      <article
        ref={parent}
        className={`prose-xl prose ${
          disclosure.open && isOverflow ? 'h-fit' : 'h-[10rem]'
        } min-h-fit min-w-full overflow-hidden overflow-x-hidden text-gray-600 prose-img:max-w-[60vw] prose-img:rounded-2xl dark:text-white/80 lg:prose-2xl`}
        dangerouslySetInnerHTML={{
          __html: instructor?.bio?.bioDescription || '',
        }}
      ></article>

      <>
        {isOverflow && (
          <Disclosure
            className="absolute-center flex w-full flex-col"
            state={disclosure}
          >
            <span>{disclosure.open ? 'Xem thêm' : 'Thu gọn'}</span>
            <ChevronUpIcon
              className={`smooth-effect h-6 w-6 ${
                disclosure.open ? 'rotate-180 transform' : ''
              }`}
            />
          </Disclosure>
        )}
      </>
    </div>
  );
}
export default memo(Instructor);
