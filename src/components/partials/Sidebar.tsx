import { Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { useAtom } from 'jotai';
import { sidebarState } from '~/atoms/sidebarAtom';
import Logo from './Logo';
import Collapse from '../shared/Collapse';
import { categories, categories_detail } from '~/constants';
import { useRouter } from 'next/router';
import { useEffectOnce } from 'usehooks-ts';

export default function Sidebar() {
  const [value, setValue] = useAtom(sidebarState);
  const router = useRouter();

  //effect turn off the UI when user navigate
  useEffectOnce(() => {
    const handleRouteChange = () => {
      setValue(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  });

  return (
    <Transition appear show={value} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[500] text-black dark:text-white"
        onClose={() => {
          setValue(false);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed left-0 top-0 h-fit">
          <div className="flex h-fit items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-200 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-200 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="flex h-screen min-h-screen w-[230px] transform flex-col space-y-4 overflow-y-scroll bg-light-background px-2 py-10 shadow-xl transition-all dark:bg-dark-background">
                <Logo />

                <h2 className="px-2 text-left text-2xl">Danh mục</h2>

                {categories_detail.map((category) => {
                  return (
                    <Collapse
                      key={category.title}
                      title={category.title}
                      contents={[category.title].concat(category.fields)}
                    />
                  );
                })}

                {categories.length > 0 &&
                  categories.map((category) => {
                    return (
                      <h2
                        key={category.title}
                        className="p-2 text-left text-2xl"
                      >
                        {category.title}
                      </h2>
                    );
                  })}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
