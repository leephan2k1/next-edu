import Link from 'next/link';
import type { ReactNode } from 'react';
import { PATHS } from '~/constants';

interface PublicLinkProfileProps {
  children: ReactNode;
  userId: string;
}

export default function PublicLinkProfile({
  userId,
  children,
}: PublicLinkProfileProps) {
  return (
    <Link target={'_blank'} href={`/${PATHS.USER}/${userId}`}>
      {children}
    </Link>
  );
}
