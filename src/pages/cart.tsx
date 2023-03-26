import { type NextPage } from 'next';
import Cart from '~/components/features/payment/Cart';
import Head from '~/components/shared/Head';

const CartPage: NextPage = () => {
  return (
    <>
      <Head title="Thanh toán - Next Edu" />

      <div className="mx-auto min-h-screen w-full pt-6 md:max-w-[720px] lg:max-w-[1200px]">
        <Cart />
      </div>
    </>
  );
};

export default CartPage;
