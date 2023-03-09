import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { PATHS } from '~/constants';
import { trpc } from '~/utils/trpc';
import axios from 'axios';
import { nanoid } from 'nanoid';
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
  checkoutState: 'error' | 'success' | 'loading' | 'idk';
  handleCheckout: () => Promise<void>;
  totalAmount: number;
}

interface CartContextProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = ({ children }: CartContextProps) => {
  const router = useRouter();
  const [checkoutState, setCheckoutStatus] = useState<
    'idk' | 'error' | 'loading' | 'success'
  >('idk');
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

  const totalAmount = useMemo(() => {
    if (!userWithCart) return 0;

    return userWithCart.cart.reduce((acc, curr) => {
      if (!curr.course.coursePrice) return acc;

      return acc + curr.course.coursePrice;
    }, 0);
  }, [userWithCart]);

  const handleCheckout = async () => {
    setCheckoutStatus('loading');
    if (
      status === 'loading' ||
      status === 'error' ||
      sessionStatus === 'unauthenticated' ||
      sessionStatus === 'loading' ||
      !session?.user?.id ||
      !userWithCart?.cart
    ) {
      toast.error('Lỗi thanh toán! Thử lại sau');
      setCheckoutStatus('error');
      return;
    }

    try {
      const data = await axios.post(`/api/payment/create`, {
        amount: totalAmount,
        orderDescription: nanoid(),
        courseIds: userWithCart.cart.map((elem) => elem.courseId),
        userId: session?.user?.id,
      });

      setCheckoutStatus('success');
      router.push(data.data.vnpUrl);
    } catch (error) {
      toast.error('Lỗi thanh toán! Thử lại sau');
      setCheckoutStatus('error');
      console.error(error);
    }
  };

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
        checkoutState,
        totalAmount,
        handleCheckout,
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
