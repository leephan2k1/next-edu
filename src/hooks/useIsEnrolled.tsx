import { useState, useEffect } from 'react';
import type { CourseType } from '~/types';
import { useSession } from 'next-auth/react';

export default function useIsEnrolled({ course }: { course?: CourseType }) {
  const { data: session } = useSession();
  const [isEnroll, setIsEnroll] = useState(false);

  useEffect(() => {
    const userId = session?.user?.id;

    if (
      course &&
      userId &&
      course.students.find((student) => student.userId === userId)
    ) {
      setIsEnroll(true);
    }

    return () => {
      setIsEnroll(false);
    };
  }, [course]);

  return isEnroll;
}
