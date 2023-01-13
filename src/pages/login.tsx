import type { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import usePreviousRoute from '~/contexts/HistoryRouteContext';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';

import type { ReactNode } from 'react';

const LogIn: NextPage = () => {
  const hsRouteCtx = usePreviousRoute();

  return (
    <div className="absolute-center h-screen w-full text-gray-600 dark:bg-black dark:text-white/70">
      <div className="h-[400px] w-[90%] md:w-[600px]">
        <div className="full-size relative flex flex-col rounded-xl rounded-tr-[250px] rounded-bl-[250px] border-2 border-dashed border-gray-500 bg-white shadow-2xl dark:bg-dark-background md:rounded-tr-[350px] md:rounded-bl-[350px]">
          <div className="full-size absolute top-0 left-0 flex flex-col items-center justify-evenly overflow-hidden rounded-xl rounded-br-[250px] rounded-tl-[250px] border-2 border-gray-500 bg-stone-50 py-20 shadow-2xl dark:bg-dark-background md:py-14">
            <div className="flex flex-col">
              <h1 className="font-secondary text-center text-4xl uppercase md:text-5xl">
                đăng nhập
              </h1>
              <h2 className="text-center capitalize italic text-yellow-500">
                next edu
              </h2>
            </div>

            <div className="flex flex-col space-y-6">
              <button
                onClick={() =>
                  signIn('facebook', {
                    callbackUrl: `${hsRouteCtx?.url ? hsRouteCtx?.url : '/'}`,
                  })
                }
                className="smooth-effect absolute-center mx-auto w-[200px] space-x-2 rounded-3xl border border-gray-700 py-4 px-6 hover:scale-110 hover:bg-sky-100 hover:text-sky-800 md:w-[250px]"
              >
                <Image
                  src="/icons/fb_icon.svg"
                  alt="Facebook Icon"
                  width={30}
                  height={30}
                />

                <span className="text-base md:text-xl">
                  Đăng nhập với Facebook
                </span>
              </button>
              <button
                onClick={() =>
                  signIn('google', {
                    callbackUrl: `${hsRouteCtx?.url ? hsRouteCtx?.url : '/'}`,
                  })
                }
                className="smooth-effect absolute-center mx-auto w-[200px] space-x-2 rounded-3xl border border-gray-700 py-4 px-6 hover:scale-110 hover:bg-yellow-100 hover:text-yellow-800 md:w-[250px]"
              >
                <Image
                  src="/icons/gg_icon.svg"
                  alt="Facebook Icon"
                  width={30}
                  height={30}
                />

                <span className="text-base md:text-xl">
                  Đăng nhập với Google
                </span>
              </button>
            </div>
          </div>

          <Link href={`${hsRouteCtx?.url ? hsRouteCtx?.url : '/'}`}>
            <button className="smooth-effect m-6 w-fit rounded-2xl border border-gray-700 p-2 hover:scale-110">
              <ArrowLeftIcon className="h-8 w-8" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
LogIn.getLayout = (page: ReactNode) => page;

export default LogIn;
