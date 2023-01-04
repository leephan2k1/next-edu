import type { NextPage } from 'next';
import CourseHeader from '~/components/courses/CourseHeader';
import BuyOnly from '~/components/partials/BuyOnly';
import CourseBody from '~/components/courses/CourseBody';
import CourseFooter from '~/components/courses/CourseFooter';
import CommentModal from '~/components/shared/CommentModal';

const CoursePage: NextPage = () => {
  return (
    <div className="min-h-screen">
      <CourseHeader />

      <CourseBody />

      <CourseFooter />

      <CommentModal />

      <BuyOnly />
    </div>
  );
};

export default CoursePage;
