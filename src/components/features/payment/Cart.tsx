import { useRef } from 'react';
import { Else, If, Then } from 'react-if';
import { useIntersectionObserver } from 'usehooks-ts';
import Loading from '~/components/buttons/Loading';
import useCart from '~/contexts/CartContext';

import { ShoppingCartIcon } from '@heroicons/react/24/outline';

import CartItem from './CartItem';
import CheckoutOnly from './CheckoutOnly';

export default function Cart() {
  const refBtnCheckout = useRef<HTMLButtonElement | null>(null);
  const entry = useIntersectionObserver(refBtnCheckout, {});
  const cartCtx = useCart();

  return (
    <div className="flex w-full flex-col px-4 md:px-6 lg:px-8">
      <CheckoutOnly shouldShow={!Boolean(entry?.isIntersecting)} />

      <div className="flex space-x-4">
        <ShoppingCartIcon className="h-10 w-10" />
        <h1 className="text-4xl font-semibold capitalize">Giỏ hàng</h1>
      </div>

      <div className="mt-12 flex w-full flex-col-reverse md:flex-row md:space-x-6">
        <div className="flex w-full flex-col md:w-[70%]">
          <h2 className="text-2xl font-semibold">
            {cartCtx?.userWithCart && cartCtx?.userWithCart.cart
              ? cartCtx?.userWithCart.cart.length
              : 0}{' '}
            khoá học trong giỏ hàng
          </h2>

          <If condition={cartCtx?.status === 'loading'}>
            <Then>
              <div className="absolute-center mt-10 h-full">
                <Loading />
              </div>
            </Then>
            <Else>
              <ul className="my-6 w-full space-y-8">
                {cartCtx?.userWithCart &&
                  cartCtx?.userWithCart.cart &&
                  cartCtx?.userWithCart.cart.length > 0 &&
                  cartCtx?.userWithCart.cart.map((item) => {
                    return (
                      <CartItem
                        courseId={item.courseId}
                        wishlistId={
                          // @ts-ignore
                          cartCtx?.userWithCart.wishlist.find(
                            (elem) => elem.courseId === item.courseId,
                          )?.id || null
                        }
                        // @ts-ignore
                        isFavorite={cartCtx?.userWithCart.wishlist.some(
                          (elem) => elem.courseId === item.courseId,
                        )}
                        cartId={item.id}
                        key={item.id}
                        // @ts-ignore
                        course={item.course}
                        refetchData={cartCtx.refetchData}
                      />
                    );
                  })}
              </ul>
            </Else>
          </If>
        </div>

        <div className="mb-8 flex flex-1 flex-col space-y-6 md:mb-0">
          <h2 className="text-3xl font-semibold">Tổng:</h2>
          <p className="text-4xl font-bold text-rose-500">
            {' '}
            {new Intl.NumberFormat('vi-VI', {
              style: 'currency',
              currency: 'VND',
            }).format(
              cartCtx?.userWithCart && cartCtx?.userWithCart.cart
                ? cartCtx?.userWithCart.cart.reduce((acc, curr) => {
                    //@ts-ignore
                    if (!curr.course.coursePrice) return acc;
                    //@ts-ignore
                    return acc + curr.course.coursePrice;
                  }, 0)
                : 0,
            )}
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
