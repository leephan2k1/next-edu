import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { categories_detail } from '~/constants';

import { Transition } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useOnClickOutside } from 'usehooks-ts';
import CategoryItem from './CategoryItem';

function CategoriesDropDown() {
  const [open, setOpen] = useState(false);
  const [hoverKey, setKey] = useState('');
  const ref = useRef(null);

  const setHoverKey = useCallback((state: string) => {
    setKey(state);
  }, []);

  useOnClickOutside(ref, () => {
    setOpen(false);
  });

  useEffect(() => {
    if (!open) {
      setKey('');
    }
  }, [open]);

  return (
    <div ref={ref} className="relative w-fit">
      <>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex space-x-2 p-2 text-gray-600 hover:text-yellow-500 dark:text-white"
        >
          <Bars3Icon className="h-8 w-8" />
          <span>Danh mục</span>
        </button>

        <Transition
          show={open}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <div className=" absolute top-full left-0 z-10 flex rounded-2xl bg-white py-6 dark:bg-dark-background">
            <ul className="flex flex-col space-y-4">
              {categories_detail.length > 0 &&
                categories_detail.map((category) => {
                  return (
                    <CategoryItem
                      displayArrow
                      key={category.title}
                      title={category.title}
                      setHoverKey={setHoverKey}
                    />
                  );
                })}
            </ul>

            <ul className="smooth-effect flex flex-col space-y-4 px-2">
              {hoverKey &&
                categories_detail
                  .find((e) => e.title.toLowerCase() === hoverKey.toLowerCase())
                  ?.fields.map((field) => {
                    return <CategoryItem key={field} title={field} />;
                  })}
            </ul>
          </div>
        </Transition>
      </>
    </div>
  );
}

export default memo(CategoriesDropDown);
