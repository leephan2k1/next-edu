import { memo } from 'react';
import TestimonialCard from '../shared/TestimonialCard';
import { useSetAtom } from 'jotai';
import { commentModalState } from '~/atoms/commentModal';

function CourseComment() {
  const setCommentModalState = useSetAtom(commentModalState);

  return (
    <section className="mx-auto w-full lg:w-[70%]">
      <h1 className="mb-6 text-2xl font-semibold md:text-3xl">
        Nhận xét của học viên
      </h1>

      <div className="grid-col-1 grid grid-rows-2 gap-4 text-gray-600 md:grid-cols-2">
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
      </div>

      <button
        onClick={() => setCommentModalState(true)}
        className="btn-follow-theme btn-lg btn mt-6"
      >
        Xem thêm
      </button>
    </section>
  );
}

export default memo(CourseComment);
