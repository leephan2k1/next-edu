import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import useSearchModalState from '~/atoms/searchModalState';

export default function Search() {
  const [_, setIsOpen] = useSearchModalState();

  return (
    <div
      onClick={() => setIsOpen(true)}
      className="flex w-full cursor-text space-x-2 rounded-full border border-gray-500 bg-white py-4 px-6 dark:border-2 dark:border-yellow-500 dark:bg-highlight"
    >
      <p className="w-full dark:text-gray-400">Tìm kiếm...</p>
      <MagnifyingGlassIcon className="inline-block h-8 w-8" />
    </div>
  );
}
