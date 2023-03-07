import { useRef } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

import { ShoppingCartIcon } from '@heroicons/react/24/outline';

import CartItem from './CartItem';
import CheckoutOnly from './CheckoutOnly';

export default function Cart() {
  const refBtnCheckout = useRef<HTMLButtonElement | null>(null);
  const entry = useIntersectionObserver(refBtnCheckout, {});

  return (
    <div className="flex w-full flex-col px-4 md:px-6 lg:px-8">
      <CheckoutOnly shouldShow={!Boolean(entry?.isIntersecting)} />

      <div className="flex space-x-4">
        <ShoppingCartIcon className="h-10 w-10" />
        <h1 className="text-4xl font-semibold capitalize">Giỏ hàng</h1>
      </div>

      <div className="mt-12 flex w-full flex-col-reverse md:flex-row md:space-x-6">
        <div className="flex w-full flex-col md:w-[70%]">
          <h2 className="text-2xl font-semibold">2 khoá học trong giỏ hàng</h2>

          <ul className="my-6 w-full space-y-8">
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
          </ul>
        </div>

        <div className="mb-8 flex flex-1 flex-col space-y-6 md:mb-0">
          <h2 className="text-3xl font-semibold">Tổng:</h2>
          <p className="text-4xl font-bold text-rose-500">
            {' '}
            {new Intl.NumberFormat('en', { notation: 'standard' }).format(
              1_960_000,
            )}{' '}
            vnđ
          </p>

          <button
            ref={refBtnCheckout}
            className="rounded-lg bg-yellow-400 p-4 text-black"
          >
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}
