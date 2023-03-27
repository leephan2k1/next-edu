import { Transition } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import type { ReactNode } from 'react';
import { Fragment, useRef, useState } from 'react';
import Teleport from '../shared/Teleport';
import Logo from './Logo';
import { useEffectOnce } from 'usehooks-ts';
import { useRouter } from 'next/router';

interface DashBoardSidebarSidebarProps {
  children: ReactNode;
}

export default function DashBoardSidebar({
  children,
}: DashBoardSidebarSidebarProps) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);

  //effect turn off the UI when user navigate
  useEffectOnce(() => {
    const handleRouteChange = () => {
      setShowSidebar(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  });

  return (
    <>
      {!showSidebar && (
        <button
          onClick={() => setShowSidebar(true)}
          className="btn-follow-theme btn-circle btn absolute top-6 left-6 md:hidden"
        >
          <Bars3Icon className="h-8 w-8" />
        </button>
      )}

      <Teleport>
        <Transition
          show={showSidebar}
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            onClick={() => {
              setShowSidebar(false);
            }}
            className="fixed inset-0 z-[400] bg-black bg-opacity-25"
          />
        </Transition>
      </Teleport>

      <aside
        ref={ref}
        className={`${
          showSidebar ? 'flex animate-in slide-in-from-left' : 'hidden'
        } slide-out-from-right fixed left-0 top-0 z-[401] h-screen w-[15rem] flex-col items-center space-y-10 bg-white px-4  pt-10 dark:bg-dark-background md:flex`}
      >
        <Logo customStyles="md:text-3xl" />

        {children}
      </aside>
    </>
  );
}
