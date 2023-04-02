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

  const handleCheckout = async () => {
    await cartCtx?.handleCheckout();
  };

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

          <If condition={cartCtx?.status === 'loading' || cartCtx?.addCourseToCartStatus === 'loading'}>
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
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          cartCtx?.userWithCart.wishlist.find(
                            (elem) => elem.courseId === item.courseId,
                          )?.id || null
                        }
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        isFavorite={cartCtx?.userWithCart.wishlist.some(
                          (elem) => elem.courseId === item.courseId,
                        )}
                        cartId={item.id}
                        key={item.id}
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
            {new Intl.NumberFormat('vi-VI', {
              style: 'currency',
              currency: 'VND',
            }).format(cartCtx?.totalAmount || 0)}
          </p>

          {cartCtx?.totalAmount && cartCtx?.totalAmount !== 0 ? (
            <button
              onClick={handleCheckout}
              ref={refBtnCheckout}
              disabled={cartCtx?.checkoutState === 'loading'}
              className="absolute-center min-h-[4.4rem] rounded-lg bg-yellow-400 p-4 text-black"
            >
              {cartCtx?.checkoutState === 'loading' ? (
                <Loading />
              ) : (
                'Thanh toán'
              )}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
