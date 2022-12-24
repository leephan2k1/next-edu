import Link from "next/link";
import { preahvihear } from "~/constants";

export default function Logo() {
	return (
		<Link
			href={"/"}
			className="text-3xl font-bold md:text-5xl text-yellow-400 dark:text-primary"
			style={{
				fontFamily: preahvihear.style.fontFamily,
			}}
		>
			Next Edu
		</Link>
	);
}
