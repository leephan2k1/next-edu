import React from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { PATHS } from '~/constants';

export default function BellNotification() {
  return (
    <Link
      className="relative h-9 w-9"
      href={`/${PATHS.USER}/${PATHS.USER_PROFILE}?section=notifications`}
    >
      <BellIcon className="h-9 w-9 font-bold" />
      <span className="absolute top-0 right-0 flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
      </span>
    </Link>
  );
}
