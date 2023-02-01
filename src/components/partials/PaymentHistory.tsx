import { WalletIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { ClockIcon } from '@heroicons/react/24/outline';

export default function PaymentHistory() {
  return (
    <section className="mt-4 flex w-full flex-col space-y-6 px-2 md:px-14 lg:px-20">
      <h1 className="flex space-x-2 text-3xl">
        <WalletIcon className="h-10 w-10" /> <span>Các khoá học đã mua</span>
      </h1>

      <ul className="flex flex-col space-y-4">
        <PaymentItem />
        <PaymentItem />
        <PaymentItem />
        <PaymentItem />
        <PaymentItem />
        <PaymentItem />
      </ul>

      {/* <h2 className="my-6 mx-auto w-fit rounded-xl border border-white p-4 text-center">
        Bạn chưa mua khoá học nào!
      </h2> */}
    </section>
  );
}

// purchase date + course title + course image + instructor
function PaymentItem() {
  return (
    <li className="flex h-fit w-full cursor-pointer items-center space-x-4 rounded-xl bg-white py-4 px-2 shadow-xl dark:bg-dark-background">
      <div className="my-auto w-[25%] md:w-[20%] lg:w-[15%]">
        <figure className="relative overflow-hidden rounded-xl pb-[56.25%]">
          <Image
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            fill
            alt="course-thumbnail"
            src={
              'https://img-b.udemycdn.com/course/750x422/1565838_e54e_16.jpg'
            }
          />
        </figure>
      </div>

      <div className="h-full flex-1">
        <h2 className="line-clamp-1">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi enim
          distinctio animi soluta nemo aspernatur odio sint ut reiciendis
          exercitationem alias dolorem necessitatibus tempora, voluptatibus,
          aliquam placeat magnam, tempore repellat.
        </h2>
        <h3 className="text-xl">Instructor name</h3>
        <div className="mt-2 flex items-center justify-between pr-6">
          <time className="flex items-center space-x-2 text-sm">
            <ClockIcon className="h-4 w-4" /> <span>10/1/2022</span>{' '}
          </time>
          <h4 className="font-bold text-rose-400">
            {new Intl.NumberFormat('en', { notation: 'compact' }).format(
              1_522_00,
            )}{' '}
            vnđ
          </h4>
        </div>
      </div>
    </li>
  );
}
