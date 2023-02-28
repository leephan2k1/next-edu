import type { ReactNode } from 'react';

interface CourseBodyProps {
  children: ReactNode;
}

export default function CourseBody({ children }: CourseBodyProps) {
  return (
    <div className="my-16 w-full text-gray-600 dark:text-white/80">
      <div className="mx-auto flex w-full flex-col space-y-14 px-4 md:max-w-[720px] lg:max-w-[1200px]">
        {children}
      </div>
    </div>
  );
}
