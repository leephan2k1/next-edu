import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { BsFacebook, BsLinkedin, BsTwitter, BsYoutube } from 'react-icons/bs';
import Balancer from 'react-wrap-balancer';
import { PATHS } from '~/constants';
import { trpc } from '~/utils/trpc';

import {
  ChatBubbleBottomCenterIcon,
  LinkIcon,
} from '@heroicons/react/24/outline';

import ModernCourseCard from '../shared/ModernCourseCard';

import type { User } from '@prisma/client';
interface PublicProfileProps {
  user: User;
}

export default function PublicProfile({ user }: PublicProfileProps) {
  const { data: session } = useSession();

  const totalStudents = useMemo(() => {
    if (!user) return 0;
    return user.Course.reduce((acc, course) => {
      return acc + course.students.length;
    }, 0);
  }, [user]);

  const totalReviews = useMemo(() => {
    if (!user) return 0;
    return user.Course.reduce((acc, course) => {
      return acc + course.reviews.length;
    }, 0);
  }, [user]);

  const socialContacts = useMemo(() => {
    if (!user || !user?.bio) return null;

    return Object.fromEntries(
      new Map(user.bio.socialContacts.map((e) => [e.title, e.url])),
    );
  }, [user]);

  const { mutate: createChatSession } =
    trpc.chat.createChatSession.useMutation();

  const handleLocateParticipant = () => {
    if (session?.user && session?.user?.id) {
      createChatSession({ userIdOne: session?.user.id, userIdTwo: user.id });
    }
  };

  return (
    <div className="flex w-full flex-col-reverse px-4 md:flex-row md:space-x-6">
      <div className="flex h-fit w-full flex-col space-y-8 md:w-[60%] lg:w-[70%]">
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-bold text-gray-400">
            {user.role === 'INSTRUCTOR' ? 'Giáo viên' : 'Người dùng'}
          </h2>
          <h1 className="text-4xl font-bold md:text-5xl">{user.name}</h1>
        </div>

        <p className="font-bold italic">{user.bio?.specialist || ''}</p>

        <div className="flex space-x-6">
          <div className="flex flex-col space-y-2">
            <h2 className="text-3xl font-bold text-gray-400">
              Số lượng học sinh
            </h2>
            <h1 className="text-4xl">{totalStudents}</h1>
          </div>

          <div className="flex flex-col space-y-2">
            <h2 className="text-3xl font-bold text-gray-400">
              Số lượng đánh giá
            </h2>
            <h1 className="text-4xl">{totalReviews}</h1>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-bold text-gray-400">Tiểu sử</h2>

          <Balancer>
            <article
              className={`prose-xl prose h-fit min-h-fit min-w-full overflow-hidden overflow-x-hidden text-gray-600 prose-img:max-w-[60vw] prose-img:rounded-2xl dark:text-white/80 lg:prose-2xl`}
              dangerouslySetInnerHTML={{
                __html: user?.bio?.bioDescription || 'Chưa cập nhật',
              }}
            ></article>
          </Balancer>
        </div>

        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-bold text-gray-400">Khoá học</h2>
          <ul className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {user?.Course &&
              user.Course.length > 0 &&
              user.Course.map((course) => {
                return (
                  <ModernCourseCard
                    key={course.id}
                    course={course}
                    path={`/${PATHS.COURSE}/${course.slug}`}
                  />
                );
              })}
          </ul>
        </div>
      </div>

      <div className="mb-14 flex h-fit flex-1 flex-col items-center space-y-6 md:mb-0">
        <figure className="relative h-[10rem] min-h-[10rem] w-[10rem] min-w-[10rem] overflow-hidden rounded-full md:h-[15rem] md:w-[15rem]">
          <Image
            priority
            fill
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            alt="user-avatar"
            src={user?.image || ''}
          />
        </figure>

        {session?.user?.id !== user.id && (
          <button
            onClick={handleLocateParticipant}
            className="absolute-center smooth-effect w-3/4 max-w-[50%] rounded-xl border border-gray-600 hover:bg-white/25 dark:border-gray-400 md:max-w-[70%]"
          >
            <Link
              href={`/${PATHS.USER}/${PATHS.USER_PROFILE}?section=message`}
              className="full-size flex flex-nowrap items-center justify-center space-x-2 py-3 px-4 line-clamp-1"
            >
              <ChatBubbleBottomCenterIcon className="inline h-8 w-8" />
              <span>Trò chuyện</span>
            </Link>
          </button>
        )}

        {socialContacts && (
          <>
            {socialContacts['webUrl'] && (
              <button className="absolute-center smooth-effect w-3/4 max-w-[50%] rounded-xl border border-gray-600 py-3 px-4 hover:bg-white/25 dark:border-gray-400 md:max-w-[70%]">
                <a
                  target={'_blank'}
                  rel="noreferrer"
                  href={socialContacts['webUrl'] as string}
                  className="flex flex-nowrap items-center justify-center space-x-2 line-clamp-1"
                >
                  <LinkIcon className="inline h-8 w-8" />
                  <span>{socialContacts['webUrl'] as string}</span>
                </a>
              </button>
            )}

            {socialContacts['facebook'] && (
              <button className="absolute-center smooth-effect w-3/4 max-w-[50%] rounded-xl border border-gray-600 py-3 px-4 hover:bg-white/25 dark:border-gray-400 md:max-w-[70%]">
                <a
                  target={'_blank'}
                  rel="noreferrer"
                  href={`https://www.facebook.com/${socialContacts['facebook']}`}
                  className="flex flex-nowrap items-center justify-center space-x-2 line-clamp-1"
                >
                  <BsFacebook className="inline h-8 w-8" />
                  <span>{socialContacts['facebook'] as string}</span>
                </a>
              </button>
            )}

            {socialContacts['twitter'] && (
              <button className="absolute-center smooth-effect w-3/4 max-w-[50%] rounded-xl border border-gray-600 py-3 px-4 hover:bg-white/25 dark:border-gray-400 md:max-w-[70%]">
                <a
                  target={'_blank'}
                  rel="noreferrer"
                  href={`https://twitter.com/${socialContacts['twitter']}`}
                  className="flex flex-nowrap items-center justify-center space-x-2 line-clamp-1"
                >
                  <BsTwitter className="inline h-8 w-8" />
                  <span>{socialContacts['twitter'] as string}</span>
                </a>
              </button>
            )}

            {socialContacts['youtube'] && (
              <button className="absolute-center smooth-effect w-3/4 max-w-[50%] rounded-xl border border-gray-600 py-3 px-4 hover:bg-white/25 dark:border-gray-400 md:max-w-[70%]">
                <a
                  target={'_blank'}
                  rel="noreferrer"
                  href={`https://www.youtube.com/${socialContacts['youtube']}`}
                  className="flex flex-nowrap items-center justify-center space-x-2 line-clamp-1"
                >
                  <BsYoutube className="inline h-8 w-8" />
                  <span>{socialContacts['youtube'] as string}</span>
                </a>
              </button>
            )}

            {socialContacts['linkedin'] && (
              <button className="absolute-center smooth-effect w-3/4 max-w-[50%] rounded-xl border border-gray-600 py-3 px-4 hover:bg-white/25 dark:border-gray-400 md:max-w-[70%]">
                <a
                  target={'_blank'}
                  rel="noreferrer"
                  href={`https://www.linkedin.com/in/${socialContacts['linkedin']}`}
                  className="flex flex-nowrap items-center justify-center space-x-2 line-clamp-1"
                >
                  <BsLinkedin className="inline h-8 w-8" />
                  <span>{socialContacts['linkedin'] as string}</span>
                </a>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
