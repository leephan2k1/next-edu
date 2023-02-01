import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import MainLayout from '~/components/layouts/MainLayout';
import ProfileInfo from '~/components/partials/ProfileInfo';

const ProfileForms = dynamic(
  () => import('~/components/partials/ProfileForms'),
);
const FollowedCourses = dynamic(
  () => import('~/components/partials/FollowedCourses'),
);
const Messages = dynamic(() => import('~/components/partials/Messages'));
const Notifications = dynamic(
  () => import('~/components/partials/Notifications'),
);
const ParentsOversee = dynamic(
  () => import('~/components/partials/ParentsOversee'),
);
const PaymentHistory = dynamic(
  () => import('~/components/partials/PaymentHistory'),
);

const SECTION_MAPPING: { [key: string]: JSX.Element } = {
  info: <ProfileForms />,
  'followed-courses': <FollowedCourses />,
  message: <Messages />,
  notifications: <Notifications />,
  'parent-control': <ParentsOversee />,
  'payment-history': <PaymentHistory />,
};

const ProfilePage: NextPage = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col text-gray-600 dark:text-white">
      <div className="mx-auto mt-10 flex h-fit w-full max-w-[1300px] flex-col space-x-4 md:flex-row">
        <ProfileInfo />

        {SECTION_MAPPING[String(router.query?.section || 'info')]}
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
