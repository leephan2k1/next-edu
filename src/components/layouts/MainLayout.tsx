import dynamic from "next/dynamic";
import { nunito } from "~/constants";

import type { ReactNode } from "react";
interface MainLayoutProps {
	children: ReactNode;
	showHeader?: boolean;
	showFooter?: boolean;
}

const Header = dynamic(() => import("../partials/Header"));

export default function MainLayout({ children }: MainLayoutProps) {
	return (
		<div className={`${nunito.className} bg-light-background dark:bg-black`}>
			<Header />

			<main>{children}</main>
		</div>
	);
}
