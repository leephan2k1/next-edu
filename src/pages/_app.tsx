import 'nprogress/nprogress.css';
import '~/styles/globals.scss';

import { Provider as JotaiProvider } from 'jotai';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import Router from 'next/router';
import NProgress from 'nprogress';
import MainLayout from '~/components/layouts/MainLayout';
import { CartContextProvider } from '~/contexts/CartContext';
import { CourseContextProvider } from '~/contexts/CourseContext';
import { HistoryRouteContextProvider } from '~/contexts/HistoryRouteContext';
import { SocketContextProvider } from '~/contexts/SocketContext';
import { trpc } from '~/utils/trpc';

import type { NextPage } from 'next';
import type { Session } from 'next-auth';
import type { AppProps, AppType } from 'next/app';
import type { ReactElement, ReactNode } from 'react';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

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
      <JotaiProvider>
        <ThemeProvider enableSystem={false} attribute="class">
          <CourseContextProvider>
            <HistoryRouteContextProvider>
              <CartContextProvider>
                <SocketContextProvider>
                  {getLayout(<Component {...pageProps} />)}
                </SocketContextProvider>
              </CartContextProvider>
            </HistoryRouteContextProvider>
          </CourseContextProvider>
        </ThemeProvider>
      </JotaiProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
