import dynamic from 'next/dynamic';
import { nunito } from '~/constants';

import type { ReactNode } from 'react';
interface MainLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

const Header = dynamic(() => import('../partials/Header'));
const Sidebar = dynamic(() => import('../partials/Sidebar'));

export default function MainLayout({ showHeader, children }: MainLayoutProps) {
  return (
    <div className={`${nunito.className} bg-light-background dark:bg-black`}>
      {showHeader && <Header />}

      <Sidebar />

      <main>{children}</main>
    </div>
  );
}
