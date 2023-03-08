import { memo } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import useCart from '~/contexts/CartContext';
import { PATHS } from '~/constants';

function Cart() {
  const cartCtx = useCart();

  return (
    <Link href={`/${PATHS.CART}`} className="relative flex h-full items-center">
      {cartCtx?.userWithCart?.cart && cartCtx?.userWithCart?.cart.length > 0 ? (
        <span className="absolute-center absolute -top-2 -right-2 h-6 w-6 rounded-full bg-sky-500 text-sm text-white">
          {cartCtx?.userWithCart?.cart.length}
        </span>
      ) : null}

      <ShoppingCartIcon className="h-8 w-8 md:h-10 md:w-10" />
    </Link>
  );
}

export default memo(Cart);
