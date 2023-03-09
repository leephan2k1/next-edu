import React from 'react';
import useCart from '~/contexts/CartContext';
import Loading from '~/components/buttons/Loading';

interface CheckoutOnlyProps {
  shouldShow?: boolean;
}

export default function CheckoutOnly({ shouldShow }: CheckoutOnlyProps) {
  const cartCtx = useCart();

  const handleCheckout = async () => {
    await cartCtx?.handleCheckout();
  };

  if (!cartCtx?.totalAmount || cartCtx?.totalAmount === 0) {
    return null;
  }

  return (
    <div
      className={`smooth-effect fixed bottom-0 left-0 z-50 flex h-[7rem] w-screen justify-between bg-dark-background px-4 py-2 text-white/80 animate-in fade-in zoom-in dark:bg-white dark:text-gray-600 ${
        shouldShow ? '' : 'hidden'
      }`}
    >
      <button
        onClick={handleCheckout}
        disabled={cartCtx?.checkoutState === 'loading'}
        className="absolute-center m-auto h-fit w-[20rem] rounded-lg bg-yellow-400 p-4 text-black md:w-[25rem]"
      >
        {cartCtx?.checkoutState === 'loading' ? <Loading /> : 'Thanh toán'}
      </button>
    </div>
  );
}
