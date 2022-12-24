import "~/styles/globals.scss";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import MainLayout from "~/components/layouts/MainLayout";
import { trpc } from "~/utils/trpc";

import type { ReactElement, ReactNode } from "react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import type { AppProps } from "next/app";
import type { NextPage } from "next";

type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
	const getLayout =
		Component.getLayout ??
		((page) => (
			<MainLayout showHeader showFooter>
				{page}
			</MainLayout>
		));

	return (
		<SessionProvider session={session}>
			<ThemeProvider enableSystem={false} attribute="class">
				{getLayout(<Component {...pageProps} />)}
			</ThemeProvider>
		</SessionProvider>
	);
};

export default trpc.withTRPC(MyApp);
