import Image from "next/image";
import { useSession } from "next-auth/react";
import { Switch, Case } from "react-if";

export default function UserAvatar() {
	const { status } = useSession();

	return (
		<div className="avatar">
			<Switch>
				<Case condition={status === "unauthenticated"}>
					<button className="bg-primary p-4 text-gray-500 dark:border-2 dark:border-yellow-400 rounded-full border border-gray-500 md:text-xl text-lg hover:bg-primary/50 smooth-effect">
						Đăng nhập
					</button>
				</Case>

				<Case condition={status === "authenticated"}>
					<div className="w-16 rounded-full overflow-hidden dark:ring-yellow-500 dark:ring dark:ring-offset-0">
						<Image
							fill
							className="absolute rounded-full bg-no-repeat bg-center bg-cover"
							alt='user-avatar'
							src="https://placeimg.com/192/192/people"
						/>
					</div>
				</Case>

				<Case condition={status === "loading"}>
					<button className="btn bg-primary min-w-[60px] min-h-[35px] loading text-gray-500 dark:border-2 dark:border-yellow-400 rounded-full border border-gray-500" />
				</Case>
			</Switch>
		</div>
	);
}
