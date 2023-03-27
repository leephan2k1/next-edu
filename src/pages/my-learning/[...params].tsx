import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Case, Default, Else, If, Switch, Then } from 'react-if';
import Loading from '~/components/buttons/Loading';
import MyCourses from '~/components/features/learning-dashboard/MyCourses';
import MyDashboard from '~/components/features/learning-dashboard/MyDashboard';
import MyLearningSidebar from '~/components/features/learning-dashboard/MyLearningSidebar';
import MainLayout from '~/components/layouts/MainLayout';
import { trpc } from '~/utils/trpc';
import Head from '~/components/shared/Head';

const MyLearningPage: NextPage = () => {
  const router = useRouter();

  const { data, status } = trpc.user.findEnrolledCourses.useQuery();

  return (
    <>
      <Head title="Học tập - Next Edu" />

      <div className="min-h-screen w-full text-gray-600 dark:bg-black dark:text-white md:pl-[16rem]">
        <MyLearningSidebar />

        <If condition={Boolean(data && data?.courses)}>
          <Then>
            {router.query?.params && (
              <Switch>
                <Case condition={router.query?.params[0] === 'course'}>
                  <MyCourses data={data} status={status} />
                </Case>
                <Case condition={router.query?.params[0] === 'dashboard'}>
                  <MyDashboard data={data} status={status} />
                </Case>
                <Default>{null}</Default>
              </Switch>
            )}
          </Then>
          <Else>
            {status === 'loading' ? (
              <div className="absolute-center min-h-screen">
                <Loading />
              </div>
            ) : (
              <div className="min-h-screen w-full pt-[7rem] md:pt-[5rem]">
                <div className="mx-auto flex w-[90%] flex-col md:w-[80%]">
                  <h1 className="flex space-x-4 text-3xl">
                    Chưa có dữ liệu cho khoá học của bạn
                  </h1>
                </div>
              </div>
            )}
          </Else>
        </If>
      </div>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// -> There is no need for a header & a footer.
MyLearningPage.getLayout = (page: ReactNode) => {
  return <MainLayout>{page}</MainLayout>;
};

export default MyLearningPage;
