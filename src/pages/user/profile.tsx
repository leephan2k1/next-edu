import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import MainLayout from '~/components/layouts/MainLayout';
import ProfileInfo from '~/components/partials/ProfileInfo';

const ProfileForms = dynamic(
  () => import('~/components/partials/ProfileForms'),
);

const ProfilePage: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col text-gray-600 dark:text-white">
      <div className="mx-auto mt-10 flex h-fit w-full max-w-[1300px] flex-col space-x-4 md:flex-row">
        <ProfileInfo />

        <ProfileForms />
      </div>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// -> There is no need for a header & a footer.
ProfilePage.getLayout = (page: ReactNode) => {
  return (
    <MainLayout showCategoriesHeader={false} showHeader showFooter>
      {page}
    </MainLayout>
  );
};

export default ProfilePage;
