import { useMemo, useEffect, useState } from 'react';
import { ArrowsUpDownIcon, CheckIcon } from '@heroicons/react/24/outline';
import type { Review, Student } from '@prisma/client';
import ComboBox from '~/components/shared/ComboBox';
import { banksCode } from '~/constants';
import { useForm } from 'react-hook-form';
import { trpc } from '~/utils/trpc';
import toast from 'react-hot-toast';
import Loading from '~/components/buttons/Loading';
import { If, Then, Else } from 'react-if';

interface Inputs {
  bankAccount: string;
  bankName: string;
  withdrawAmount: number;
}

export default function MyWallet() {
  const [bankCode, setBankCode] = useState(banksCode[0]);
  const {
    register,
    getValues,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const { data: revenues } = trpc.user.findRevenues.useQuery();

  const { mutate: deleteWithdrawal, status: deleteWithdrawalStatus } =
    trpc.user.deleteWithdrawal.useMutation();

  const {
    data: withdrawals,
    status: withdrawalsStatus,
    refetch: refetchWithdrawals,
  } = trpc.user.findWithdrawals.useQuery({ status: 'PENDING' });

  const { mutate: withdrawMoney, status: withdrawStatus } =
    trpc.user.withdrawMoney.useMutation();

  const totalPayments = useMemo(() => {
    if (!revenues) return 0;

    const totalWithoutWithdrawal = revenues.reduce((acc, revenue) => {
      return acc + Number(revenue.amount);
    }, 0);

    if (withdrawals && withdrawals.length > 0) {
      const deductible = withdrawals.reduce((acc, w) => {
        return acc + Number(w.transaction.amount);
      }, 0);

      return totalWithoutWithdrawal - deductible;
    }

    return totalWithoutWithdrawal;
  }, [revenues, withdrawals]);

  const handleSubmit = () => {
    const { bankAccount, bankName, withdrawAmount } = getValues();

    if (!bankAccount) {
      setError('bankAccount', {
        message: 'Số tài khoảng không được để trống!',
      });
      return;
    }

    if (!bankName) {
      setError('bankName', {
        message: 'Tên tài khoảng không được để trống!',
      });
      return;
    }

    if (!withdrawAmount || withdrawAmount === 0) {
      setError('withdrawAmount', {
        message: 'Số tiền rút không được để trống hoặc bằng 0!',
      });
      return;
    }

    if (withdrawAmount > totalPayments) {
      setError('withdrawAmount', {
        message: `Số tiền rút không được vượt quá ${new Intl.NumberFormat(
          'vi-VN',
          {
            style: 'currency',
            currency: 'VND',
          },
        ).format(totalPayments)}`,
      });
      return;
    }

    withdrawMoney({
      amount: Number(withdrawAmount),
      bankAccount,
      bankName,
      bankCode: String(bankCode),
    });
  };

  const handleDeleteWithdraw = (withdrawalId: string) => {
    const isConfirmed = window.confirm('Xác nhận huỷ giao dịch?');

    if (isConfirmed) {
      deleteWithdrawal({ withdrawalId });
    }
  };

  useEffect(() => {
    if (deleteWithdrawalStatus === 'success') {
      toast.success('Huỷ thành công!');
      refetchWithdrawals();
    }

    if (withdrawStatus === 'error') {
      toast.success('Huỷ thất bại, thử lại sau');
    }
  }, [deleteWithdrawalStatus]);

  useEffect(() => {
    if (withdrawStatus === 'success') {
      toast.success('Rút thành công!');
      // clear input:
      reset({ withdrawAmount: 0 });
      refetchWithdrawals();
    }

    if (withdrawStatus === 'error') {
      toast.success('Rút thất bại, thử lại sau');
    }
  }, [withdrawStatus]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden pt-[7rem] pb-[10rem] md:pt-[5rem]">
      <div className="mx-auto flex w-[90%] flex-col md:w-[80%]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="mt-14 flex w-full flex-col space-y-6"
        >
          <h1 className="flex space-x-4 text-3xl">
            <ArrowsUpDownIcon className="h-8 w-8" />{' '}
            <span className="font-bold">
              Rút tiền (Tối đa có thể rút{' '}
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(totalPayments)}
              )
            </span>
          </h1>

          <div className="relative flex w-full flex-col pl-10">
            <h2>Ngân hàng:</h2>
            <ComboBox
              getSelectedValue={(value) => {
                setBankCode(value);
              }}
              selections={banksCode.map((e, idx) => ({ id: idx, name: e }))}
            />

            <h2>Số tài khoản:</h2>
            {errors.bankAccount && (
              <span className="test-sm italic text-rose-500">
                {errors.bankAccount.message}
              </span>
            )}
            <input
              {...register('bankAccount', { required: true })}
              onFocus={() => clearErrors('bankAccount')}
              placeholder="070123456..."
              className="my-4 min-w-[30rem] max-w-[30rem] rounded-xl bg-white py-3 px-4 dark:bg-dark-background md:min-w-[45rem] md:max-w-[45rem]"
              type="number"
            />

            <h2>Tên chủ tài khoản:</h2>
            {errors.bankName && (
              <span className="test-sm italic text-rose-500">
                {errors.bankName.message}
              </span>
            )}
            <input
              {...register('bankName', { required: true })}
              onFocus={() => clearErrors('bankName')}
              placeholder="PHAN VAN A"
              className="my-4 min-w-[30rem] max-w-[30rem] rounded-xl bg-white py-3 px-4 dark:bg-dark-background md:min-w-[45rem] md:max-w-[45rem]"
              type="text"
            />

            <h2>Số tiền rút:</h2>
            {errors.withdrawAmount && (
              <span className="test-sm italic text-rose-500">
                {errors.withdrawAmount.message}
              </span>
            )}
            <input
              {...register('withdrawAmount', { required: true })}
              onFocus={() => clearErrors('withdrawAmount')}
              placeholder="100 000"
              className="my-4 min-w-[20rem] max-w-[20rem] rounded-xl bg-white py-3 px-4 dark:bg-dark-background md:min-w-[30rem] md:max-w-[30rem]"
              type="number"
            />

            <button
              onClick={handleSubmit}
              disabled={withdrawStatus === 'loading'}
              type="submit"
              className="absolute-center btn-primary btn-lg btn mt-4 min-h-[4rem] min-w-[24rem] max-w-sm text-black"
            >
              {withdrawStatus === 'loading' ? <Loading /> : ' Rút tiền'}
            </button>
          </div>
        </form>

        <div className="mt-14 flex w-full flex-col space-y-6">
          <h1 className="flex space-x-4 text-3xl">
            <ArrowsUpDownIcon className="h-8 w-8 rotate-90" />{' '}
            <span className="font-bold">Giao dịch đang chờ phê duyệt</span>
          </h1>

          <If condition={withdrawalsStatus === 'loading'}>
            <Then>
              <div className="absolute-center min-h-[20rem] w-full">
                <Loading />
              </div>
            </Then>

            <Else>
              {withdrawals && withdrawals.length > 0 ? (
                <table className="table-auto">
                  <thead className="select-none">
                    <tr>
                      <th></th>
                      <th></th>
                      <th className="whitespace-nowrap  px-4 py-3">
                        Ngân hàng
                      </th>
                      <th className="whitespace-nowrap  px-4 py-3">Ngày tạo</th>
                      <th className="whitespace-nowrap  px-4 py-3">
                        Số tài khoản
                      </th>
                      <th className="whitespace-nowrap  px-4 py-3">
                        Tên chủ tài khoản
                      </th>
                      <th className="whitespace-nowrap  px-4 py-3">Số tiền</th>
                    </tr>
                  </thead>
                  <tbody className="rounded-xl">
                    {withdrawals.map((withdrawal, idx) => {
                      return (
                        <tr
                          key={withdrawal.id}
                          className="smooth-effect cursor-pointer rounded-2xl odd:bg-slate-300 odd:dark:bg-dark-background "
                        >
                          <th className="px-4">{idx + 1}</th>
                          <th
                            onClick={() => handleDeleteWithdraw(withdrawal.id)}
                            className="px-4 hover:text-sky-400"
                          >
                            huỷ
                          </th>
                          <td className="min-w-[20rem] py-6 lg:min-w-min lg:py-4">
                            {withdrawal.transaction.bankCode}
                          </td>
                          <td className="text-center">
                            {new Date(withdrawal.createdAt).toLocaleString(
                              'vi-VI',
                            )}
                          </td>
                          <td className="text-center">
                            {withdrawal.transaction.bankAccount}
                          </td>
                          <td className={`text-center`}>
                            {withdrawal.transaction.bankName}
                          </td>
                          <td className={`text-center`}>
                            {new Intl.NumberFormat('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                            }).format(Number(withdrawal.transaction.amount))}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : null}
            </Else>
          </If>
        </div>

        <div className="mt-14 flex w-full flex-col space-y-6">
          <h1 className="flex space-x-4 text-3xl">
            <CheckIcon className="h-8 w-8" />{' '}
            <span className="font-bold">Giao dịch đã thành công</span>
          </h1>

          <table className="table-auto">
            <thead className="select-none">
              <tr>
                <th></th>

                <th className="whitespace-nowrap  px-4 py-3">Ngân hàng</th>
                <th className="whitespace-nowrap  px-4 py-3">Ngày tạo</th>
                <th className="whitespace-nowrap  px-4 py-3">Số tài khoản</th>
                <th className="whitespace-nowrap  px-4 py-3">
                  Tên chủ tài khoản
                </th>
                <th className="whitespace-nowrap  px-4 py-3">Số tiền</th>
              </tr>
            </thead>
            <tbody className="rounded-xl">
              <tr
                // onClick={handleEditCourse}
                className="smooth-effect cursor-pointer rounded-2xl odd:bg-slate-300 odd:dark:bg-dark-background "
              >
                <th className="px-4">1</th>
                <td className="min-w-[20rem] py-6 lg:min-w-min lg:py-4">
                  sadadadada
                </td>
                <td className="text-center">adsadsada</td>
                <td className="text-center">adsadsada</td>
                <td className={`text-center`}>ádsadadadad</td>
                <td className={`text-center`}>1111</td>
              </tr>
              <tr
                // onClick={handleEditCourse}
                className="smooth-effect cursor-pointer rounded-2xl odd:bg-slate-300 odd:dark:bg-dark-background "
              >
                <th className="px-4">1</th>
                <td className="min-w-[20rem] py-6 lg:min-w-min lg:py-4">
                  sadadadada
                </td>
                <td className="text-center">adsadsada</td>
                <td className="text-center">adsadsada</td>
                <td className={`text-center`}>ádsadadadad</td>
                <td className={`text-center`}>1111</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
