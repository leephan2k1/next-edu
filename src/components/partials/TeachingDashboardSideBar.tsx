import { Transition } from '@headlessui/react';
import {
  Bars3Icon,
  ChartBarIcon,
  ChatBubbleBottomCenterIcon,
} from '@heroicons/react/24/outline';
import { Fragment, useRef, useState } from 'react';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { VscOrganization } from 'react-icons/vsc';
import Teleport from '../shared/Teleport';
import Logo from './Logo';

export default function TeachingDashBoardSidebar() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);

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
            className="fixed inset-0 z-[100] bg-black bg-opacity-25"
          />
        </Transition>
      </Teleport>

      <aside
        ref={ref}
        className={`${
          showSidebar ? 'flex animate-in slide-in-from-left' : 'hidden'
        } slide-out-from-right fixed left-0 top-0 z-[200] h-screen w-[15rem] flex-col items-center space-y-10 bg-white px-4  pt-10 dark:bg-dark-background md:flex`}
      >
        <Logo customStyles="md:text-3xl" />

        <button className="smooth-effect flex flex-col items-center space-y-2 rounded-2xl bg-slate-200 p-4 dark:bg-black">
          <AiOutlineFundProjectionScreen className="h-10 w-10" />
          <span>Khoá học</span>
        </button>

        <button className="smooth-effect flex flex-col items-center space-y-2 rounded-2xl p-4 hover:bg-slate-200 hover:dark:bg-black">
          <ChatBubbleBottomCenterIcon className="h-10 w-10" />
          <span>Giao tiếp</span>
        </button>

        <button className="smooth-effect flex flex-col items-center space-y-2 rounded-2xl p-4 hover:bg-slate-200 hover:dark:bg-black">
          <ChartBarIcon className="h-10 w-10" />
          <span>Phân tích</span>
        </button>

        <button className="smooth-effect flex flex-col items-center space-y-2 rounded-2xl p-4 hover:bg-slate-200 hover:dark:bg-black">
          <VscOrganization className="h-10 w-10" />
          <span>Tổ chức</span>
        </button>
      </aside>
    </>
  );
}
