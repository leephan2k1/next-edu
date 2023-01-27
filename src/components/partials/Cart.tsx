import { memo } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

function Cart() {
  return (
    <Link href={`/`} className="relative flex h-full items-center">
      <span className="absolute-center absolute -top-2 -right-2 h-6 w-6 rounded-full bg-sky-500 text-sm text-white">
        5
      </span>
      <ShoppingCartIcon className="h-8 w-8 md:h-10 md:w-10" />
    </Link>
  );
}

export default memo(Cart);
