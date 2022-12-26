import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Search() {
  return (
    <div className="flex w-full space-x-2 rounded-full border border-gray-500 bg-white py-4 px-6 dark:border-2 dark:border-yellow-500 dark:bg-highlight">
      <input
        type="text"
        className="z-50 flex-1 bg-transparent"
        placeholder="Tìm kiếm..."
      />
      <MagnifyingGlassIcon className="inline-block h-8 w-8" />
    </div>
  );
}
