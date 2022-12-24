import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";

export default function Menu() {
	return (
		<button className="drawer-button md:hidden p-2 dark:border-primary dark:border-2 border border-gray-500 rounded-xl drawer-content">
			<input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
			<label htmlFor="my-drawer-1" className="drawer-button">
				<Bars3BottomLeftIcon className="w-8 h-8 dark:text-white" />
			</label>
		</button>
	);
}
