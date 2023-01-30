import { memo, useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export type Section =
  | 'info'
  | 'followed-courses'
  | 'parent-control'
  | 'message'
  | 'notifications'
  | 'payment-history';

const sections: { value: Section; label: string }[] = [
  { value: 'info', label: 'Thông tin' },
  { value: 'followed-courses', label: 'Khoá học theo dõi' },
  { value: 'message', label: 'Tin nhắn' },
  { value: 'notifications', label: 'Thông báo' },
  { value: 'parent-control', label: 'Phụ huynh quản lý' },
  { value: 'payment-history', label: 'Lịch sử thanh toán' },
];

function ProfileMenu() {
  const [section, setSection] = useState<Section>('info');
  const router = useRouter();

  const handleMenuClick = (section: Section) => {
    setSection(section);
    router.replace(
      { pathname: router.pathname, query: { section: section } },
      undefined,
      { shallow: true },
    );
  };

  useEffect(() => {
    setSection(String(router.query?.section || 'info') as Section);

    return () => {
      setSection('info');
    };
  }, [router]);

  return (
    <ul className="flex w-full space-x-4 overflow-x-scroll md:flex-col md:space-x-0 md:space-y-8 md:px-4">
      {sections.map((sectionElement) => {
        return (
          <li key={sectionElement.value}>
            <button
              onClick={() => {
                handleMenuClick(sectionElement.value);
              }}
              className={`${
                section === sectionElement.value
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white hover:bg-stone-200 dark:bg-dark-background dark:hover:bg-white/20'
              } smooth-effect whitespace-nowrap rounded-xl  p-4 shadow-lg`}
            >
              {sectionElement.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function ProfileInfo() {
  const { data: auth } = useSession();

  return (
    <section className="flex w-full flex-col items-center space-y-4 px-4 md:w-[25%] lg:w-[20%]">
      <figure className="rounded-ful relative h-36 w-36">
        <Image
          fill
          className="absolute rounded-full bg-cover bg-center bg-no-repeat"
          alt="user-avatar"
          src={auth?.user?.image || 'https://i.ibb.co/1qQJr6S/blank-user.png'}
        />
      </figure>

      <h1 className="text-3xl">{auth?.user?.name}</h1>
      <h2 className="text-xl">{auth?.user?.email}</h2>

      <ProfileMenu />
    </section>
  );
}

export default memo(ProfileInfo);
