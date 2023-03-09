import { WalletIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { ClockIcon } from '@heroicons/react/24/outline';
import Loading from '../buttons/Loading';
import { trpc } from '~/utils/trpc';
import { PATHS } from '~/constants';
import Link from 'next/link';

export default function PaymentHistory() {
  const { data: payments, status } = trpc.user.findPayments.useQuery();

  return (
    <section className="mt-4 flex w-full flex-col space-y-6 px-2 md:px-14 lg:px-20">
      <h1 className="flex space-x-2 text-3xl">
        <WalletIcon className="h-10 w-10" /> <span>Các khoá học đã mua</span>
      </h1>

      {status === 'loading' ? (
        <div className="absolute-center min-h-[10rem] w-full">
          <Loading />
        </div>
      ) : (
        <ul className="flex flex-col space-y-4">
          {payments && payments.length > 0 ? (
            payments.map((payment) => {
              return (
                <PaymentItem
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-ignore
                  course={payment.course}
                  key={payment.id}
                  createdAt={payment.createdAt}
                />
              );
            })
          ) : (
            <li>Bạn chưa thanh toán khoá học nào</li>
          )}
        </ul>
      )}
    </section>
  );
}

// purchase date + course title + course image + instructor
function PaymentItem({
  course,
  createdAt,
}: {
  course: {
    coursePrice: number;
    instructor: { name: string };
    name: string;
    slug: string;
    thumbnail: string;
  };
  createdAt: Date;
}) {
  return (
    <li>
      <Link
        className="flex h-fit w-full cursor-pointer items-center space-x-4 rounded-xl bg-white py-4 px-2 shadow-xl dark:bg-dark-background"
        href={`/${PATHS.COURSE}/${course.slug}`}
      >
        <div className="my-auto w-[25%] md:w-[20%] lg:w-[15%]">
          <figure className="relative overflow-hidden rounded-xl pb-[56.25%]">
            <Image
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              fill
              alt="course-thumbnail"
              src={course.thumbnail}
            />
          </figure>
        </div>

        <div className="h-full flex-1">
          <h2 className="line-clamp-1">{course.name}</h2>
          <h3 className="my-2 text-xl">{course.instructor.name}</h3>
          <div className="mt-2 flex items-center justify-between pr-6">
            <time className="flex items-center space-x-2 text-lg">
              <ClockIcon className="h-4 w-4" />{' '}
              <span>{new Date(createdAt).toLocaleDateString('vi-VI')}</span>{' '}
            </time>
            <h4 className="font-bold text-rose-400">
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(course.coursePrice as number)}{' '}
              vnđ
            </h4>
          </div>
        </div>
      </Link>
    </li>
  );
}
