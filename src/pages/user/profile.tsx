import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import MainLayout from '~/components/layouts/MainLayout';
import ProfileInfo from '~/components/partials/ProfileInfo';
import { ChatContextProvider } from '~/contexts/ChatContext';
import Head from '~/components/shared/Head';

const ProfileForms = dynamic(
  () => import('~/components/partials/ProfileForms'),
);
const FollowedCourses = dynamic(
  () => import('~/components/partials/FollowedCourses'),
);
const Messages = dynamic(() => import('~/components/features/chat/Messages'));
const Notifications = dynamic(
  () => import('~/components/partials/Notifications'),
);
const Reminder = dynamic(() => import('~/components/partials/Reminder'));
const PaymentHistory = dynamic(
  () => import('~/components/partials/PaymentHistory'),
);

const SECTION_MAPPING: { [key: string]: JSX.Element } = {
  info: <ProfileForms />,
  'followed-courses': <FollowedCourses />,
  message: <Messages />,
  notifications: <Notifications />,
  reminder: <Reminder />,
  'payment-history': <PaymentHistory />,
};

const ProfilePage: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Head title="Trang cá nhân - Next Edu" />

      <ChatContextProvider>
        <div className="flex min-h-screen flex-col text-gray-600 dark:text-white">
          <div className="mx-auto mt-10 flex h-fit w-full max-w-[1300px] flex-col space-x-4 md:flex-row">
            <ProfileInfo />

            {SECTION_MAPPING[String(router.query?.section || 'info')]}
          </div>
        </div>
      </ChatContextProvider>
    </>
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
