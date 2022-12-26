import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline';
import { useSetAtom } from 'jotai';
import { sidebarState } from '~/atoms/sidebarAtom';

export default function Menu() {
  const setSidebarState = useSetAtom(sidebarState);

  return (
    <button
      onClick={() => {
        setSidebarState(true);
      }}
      className="drawer-button drawer-content rounded-xl border border-gray-500 p-2 dark:border-2 dark:border-primary md:hidden"
    >
      <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
      <label htmlFor="my-drawer-1" className="drawer-button">
        <Bars3BottomLeftIcon className="h-8 w-8 dark:text-white" />
      </label>
    </button>
  );
}
