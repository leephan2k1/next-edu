import { useEffect, useState } from 'react';
import useCart from '~/contexts/CartContext';

import type { CourseType } from '~/types';

export default function useIsAddToCart({ course }: { course?: CourseType }) {
  const cartCtx = useCart();
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (
      cartCtx?.userWithCart?.cart &&
      course &&
      Array.isArray(cartCtx?.userWithCart?.cart)
    ) {
      setIsAdded(
        cartCtx?.userWithCart?.cart.some((el) => el.courseId === course.id),
      );
    }

    return () => {
      setIsAdded(false);
    };
  }, [cartCtx?.userWithCart?.cart, course]);

  return isAdded;
}
