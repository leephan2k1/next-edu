import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { PATHS } from '~/constants';
import { trpc } from '~/utils/trpc';

import type { Cart, Wishlist } from '@prisma/client';
import type { ReactNode } from 'react';
interface CartContextType {
  userWithCart?: {
    wishlist: Wishlist[];
    cart: Cart[];
  } | null;
  refetchData: () => void;
  addCourseToCart: (courseId: string) => void;
  status: 'error' | 'success' | 'loading';
  addCourseToCartStatus: 'error' | 'success' | 'idle' | 'loading';
}
interface CartContextProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = ({ children }: CartContextProps) => {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  const {
    data: userWithCart,
    status,
    refetch,
  } = trpc.user.findCartByUser.useQuery(
    {
      includeCourse: true,
    },
    { enabled: sessionStatus === 'authenticated' },
  );

  const { mutate: addCourseToCartMutate, status: addCourseToCartStatus } =
    trpc.user.addCOurseToCart.useMutation();

  const addCourseToCart = (courseId: string) => {
    if (sessionStatus === 'unauthenticated') {
      router.push(`/${PATHS.LOGIN}`);
      return;
    }

    addCourseToCartMutate({ courseId });
  };

  const refetchData = () => {
    refetch();
  };

  // effect notify toast add course to cart
  useEffect(() => {
    if (addCourseToCartStatus === 'success') {
      toast.success('Thêm vào giỏ hàng thành công!');
      refetchData();
    }

    if (addCourseToCartStatus === 'error') {
      toast.error('Thêm vào giỏ hàng thất bạn! Thử lại sau!');
    }
  }, [addCourseToCartStatus]);

  return (
    <CartContext.Provider
      value={{
        userWithCart,
        refetchData,
        status,
        addCourseToCart,
        addCourseToCartStatus,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default function useCart() {
  return useContext(CartContext);
}
