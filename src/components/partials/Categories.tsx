import { categories } from "~/constants";

import { Bars3Icon } from "@heroicons/react/24/outline";

export default function Categories() {
	return (
		<div className="md:flex hidden md:space-x-6 space-x-4 lg:max-w-[1200px] w-full md:max-w-[720px] px-4 mx-auto">
			<>
				<button className="hover:text-yellow-500 smooth-effect p-2 flex space-x-2 text-gray-600 dark:text-white">
					<Bars3Icon className="w-8 h-8" />
					<span>Danh mục</span>
				</button>

				{categories.length > 0 &&
					categories.map((category) => {
						return (
							<button
								key={String(Math.random())}
								className="hover:bg-primary dark:hover:text-gray-600 hover:text-gray-500 p-2 hover:px-3 rounded-3xl smooth-effect"
							>
								{category}
							</button>
						);
					})}
			</>
		</div>
	);
}
