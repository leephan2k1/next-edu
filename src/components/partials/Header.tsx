import SwitchTheme from "../buttons/SwitchTheme";
import Search from "../shared/Search";
import Logo from "./Logo";
import UserAvatar from "./UserAvatar";
import Menu from "../buttons/Menu";

export default function Header() {
	return (
		<header className="fixed py-4 relative-x-center lg:max-w-[1200px] w-full md:max-w-[720px] min-h-[50px] px-4 z-[99]">
			<nav className="navbar flex items-center justify-between">
				<div className="space-x-6">
					<Menu />
					<Logo />
				</div>

				<div className="md:w-1/2 h-fit md:block hidden">
					<Search />
				</div>

				<div className="flex space-x-8">
					<SwitchTheme />

					<UserAvatar />
				</div>
			</nav>

			<div className="mt-6 md:hidden">
				<Search />
			</div>
		</header>
	);
}
