import { type NextPage, GetServerSideProps } from 'next';
import type { User } from '@prisma/client';
import MainLayout from '~/components/layouts/MainLayout';
import PublicProfile from '~/components/partials/PublicProfile';

interface PublicProfilePageProps {
  user: User;
}

const PublicProfilePage: NextPage<PublicProfilePageProps> = ({ user }) => {
  return (
    <div className="mx-auto flex min-h-screen flex-col pt-16 md:max-w-[720px] lg:max-w-[1200px]">
      <PublicProfile user={user} />
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;
  if (!id) return { notFound: true };

  const user = await prisma?.user.findUnique({
    where: { id },
    include: {
      bio: { include: { socialContacts: true } },
      Course: {
        orderBy: { createdAt: 'desc' },
        include: { students: true, reviews: true },
      },
    },
  });

  if (!user) return { notFound: true };

  return {
    props: { user: JSON.parse(JSON.stringify(user)) },
  };
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// -> There is no need for a header & a footer.
PublicProfilePage.getLayout = (page: ReactNode) => {
  return (
    <MainLayout showCategoriesHeader={false} showHeader showFooter>
      {page}
    </MainLayout>
  );
};

export default PublicProfilePage;
