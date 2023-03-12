import { type NextPage } from 'next';
import { GiPartyPopper } from 'react-icons/gi';
import { PATHS } from '~/constants';
import Link from 'next/link';

const PaymentStatus: NextPage = () => {
  return (
    <div className="mx-auto min-h-screen w-full pt-24 md:max-w-[720px] lg:max-w-[1200px]">
      <div className="absolute-center mt-auto w-full flex-col space-y-8">
        <GiPartyPopper className="h-20 w-20" />
        <h1 className="text-3xl font-bold md:text-4xl">
          Thanh toán thành công!
        </h1>

        <div className="absolute-center w-full space-x-6">
          <button className="btn-primary btn-lg btn">
            <Link href={`/${PATHS.MY_LEARNING}/${PATHS.COURSE}`}>Học ngay</Link>
          </button>
          <button className="btn-follow-theme btn-lg btn">
            <Link
              href={`/${PATHS.USER}/${PATHS.USER_PROFILE}?section=payment-history`}
            >
              Xem lại lịch sử thanh toán
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;
