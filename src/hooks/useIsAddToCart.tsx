import type { CourseType } from '~/types';
import { useState, useEffect } from 'react';
import useCourse from '~/contexts/CourseContext';

export default function useIsAddToCart({ course }: { course?: CourseType }) {
  const courseCtx = useCourse();
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (
      courseCtx?.userWithCart?.cart &&
      course &&
      Array.isArray(courseCtx?.userWithCart?.cart)
    ) {
      setIsAdded(
        courseCtx?.userWithCart?.cart.some((el) => el.courseId === course.id),
      );
    }

    return () => {
      setIsAdded(false);
    };
  }, [courseCtx?.userWithCart?.cart, course]);

  return isAdded;
}
