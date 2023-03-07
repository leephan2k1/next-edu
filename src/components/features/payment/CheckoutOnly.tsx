import React from 'react';

interface CheckoutOnlyProps {
  shouldShow?: boolean;
}

export default function CheckoutOnly({ shouldShow }: CheckoutOnlyProps) {
  return (
    <div
      className={`smooth-effect fixed bottom-0 left-0 z-50 flex h-[7rem] w-screen justify-between bg-dark-background px-4 py-2 text-white/80 animate-in fade-in zoom-in dark:bg-white dark:text-gray-600 ${
        shouldShow ? '' : 'hidden'
      }`}
    >
      <button className="m-auto h-fit w-[20rem] rounded-lg bg-yellow-400 p-4 text-black md:w-[25rem]">
        Thanh toán
      </button>
    </div>
  );
}
