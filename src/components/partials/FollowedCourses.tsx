import { memo } from 'react';
import ModernCourseCard from '../shared/ModernCourseCard';

function FollowedCourses() {
  return (
    <section className="w-full">
      <button className="smooth-effect my-4 w-fit rounded-xl bg-rose-400 p-4 text-xl text-white">
        Huỷ yêu thích tất cả
      </button>
      <ul className="grid w-full grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        <li>
          <ModernCourseCard />
        </li>
        <li>
          <ModernCourseCard />
        </li>
        <li>
          <ModernCourseCard />
        </li>
        <li>
          <ModernCourseCard />
        </li>
        <li>
          <ModernCourseCard />
        </li>
      </ul>
    </section>
  );
}

export default memo(FollowedCourses);
