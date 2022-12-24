import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Search() {
	return (
		<div className="relative flex w-full border border-gray-500 dark:border-2 dark:border-yellow-500 bg-white dark:bg-highlight py-4 px-6 rounded-full space-x-2">
			<span className="absolute w-full h-full top-2 left-[2px] -z-10 rounded-full bg-gray-600 dark:bg-primary" />
			<MagnifyingGlassIcon className='w-8 h-8 inline-block' />
			<input
				type="text"
				className="bg-transparent flex-1"
				placeholder="Tìm kiếm..."
			/>
		</div>
	);
}
