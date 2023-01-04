import type { NextPage } from 'next';
import type { ReactNode } from 'react';
import MainLayout from '~/components/layouts/MainLayout';
import LearningHeader from '~/components/partials/LearningHeader';

const LearningPage: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col text-gray-600 dark:text-white/60">
      <LearningHeader />
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// -> There is no need for a header & a footer.
LearningPage.getLayout = (page: ReactNode) => {
  return <MainLayout>{page}</MainLayout>;
};

export default LearningPage;
