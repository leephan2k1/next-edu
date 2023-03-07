import { type NextPage } from 'next';
import Cart from '~/components/features/payment/Cart';

const CartPage: NextPage = () => {
  return (
    <div className="mx-auto min-h-screen w-full pt-6 md:max-w-[720px] lg:max-w-[1200px]">
      <Cart />
    </div>
  );
};

export default CartPage;
