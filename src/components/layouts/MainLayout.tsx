import dynamic from 'next/dynamic';
import { nunito } from '~/constants';
import { Toaster } from 'react-hot-toast';
import SearchModal from '../shared/SearchModal';

import type { ReactNode } from 'react';
interface MainLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showCategoriesHeader?: boolean;
  showFooter?: boolean;
}

const Header = dynamic(() => import('../partials/Header'));
const Footer = dynamic(() => import('../partials/Footer'));
const Sidebar = dynamic(() => import('../partials/Sidebar'));

export default function MainLayout({
  showHeader,
  showFooter,
  showCategoriesHeader,
  children,
}: MainLayoutProps) {
  return (
    <div
      className={`${nunito.className} bg-light-background text-gray-600 dark:bg-black dark:text-white`}
    >
      <SearchModal />

      <Toaster toastOptions={{ duration: 3500 }} />

      {showHeader && <Header showCategories={showCategoriesHeader} />}

      <Sidebar />

      <main>{children}</main>

      {showFooter && <Footer />}
    </div>
  );
}
