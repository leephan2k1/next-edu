import Balancer from 'react-wrap-balancer';
import { inter } from '~/constants';
import Image from 'next/image';
import {
  ArrowTrendingUpIcon,
  ArrowsRightLeftIcon,
} from '@heroicons/react/24/solid';

export default function Banner() {
  return (
    <div className="my-6 h-fit w-full text-gray-800 dark:text-white">
      <div className="mx-auto flex h-full max-w-[1300px] flex-col md:flex-row">
        <aside className="absolute-center flex-1 p-10">
          <div className="full-size flex flex-col items-center justify-center space-y-6">
            <h1
              style={{
                fontFamily: inter.style.fontFamily,
              }}
              className="font-mono text-4xl font-semibold capitalize  md:text-7xl md:leading-[5rem] lg:text-8xl"
            >
              <Balancer>
                Giáo dục không cần sửa đổi, giáo dục cần{' '}
                <span className="highlight highlight-rose-500 highlight-variant-17">
                  cách mạng
                </span>
              </Balancer>
            </h1>

            <p className="text-xl font-light italic text-gray-500 dark:text-white/60 md:text-3xl">
              &rdquo;Chúng tôi tin rằng giáo dục online là giải pháp tiết kiệm
              và hiệu quả trong tương lai. Vì thế, nỗ lực của chúng tôi là mang
              lại nền tảng học trực tuyến tiệm cận hoàn hảo&rdquo;
            </p>
          </div>
        </aside>
        <aside className="flex flex-1 flex-col space-y-8 p-10">
          <section className="flex w-full flex-1 items-center justify-around">
            <div className="flex  flex-col space-y-2">
              <figure className="random-border-radius-var-1 relative h-36 w-36 overflow-hidden md:h-40 md:w-40">
                <Image
                  fill
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  alt="car-1886"
                  src={'https://i.ibb.co/KFbnrNq/car-1886.png'}
                />
              </figure>

              <h3 className="text-center text-xl uppercase">Car 1886</h3>
            </div>

            <ArrowTrendingUpIcon className="h-10 w-10 text-indigo-700" />

            <div className="flex  flex-col space-y-2">
              <figure className="random-border-radius-var-1 relative h-36 w-36 overflow-hidden md:h-40 md:w-40">
                <Image
                  fill
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  alt="car-1886"
                  src={'https://i.ibb.co/z20J1Pt/car-2020.png'}
                />
              </figure>

              <h3 className="text-center text-xl uppercase">Car 2020</h3>
            </div>
          </section>
          <section className="flex w-full flex-1 items-center justify-around">
            <div className="flex  flex-col space-y-2">
              <figure className="random-border-radius-var-1 relative h-36 w-36 overflow-hidden md:h-40 md:w-40">
                <Image
                  fill
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  alt="phone-1876"
                  src={'https://i.ibb.co/tHZMK3p/phone-1876.jpg'}
                />
              </figure>

              <h3 className="text-center text-xl uppercase">Phone 1876</h3>
            </div>

            <ArrowTrendingUpIcon className="h-10 w-10 text-indigo-700" />

            <div className="flex  flex-col space-y-2">
              <figure className="random-border-radius-var-1 relative h-36 w-36 overflow-hidden md:h-40 md:w-40">
                <Image
                  fill
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  alt="phone-2022"
                  src={'https://i.ibb.co/bNrgtb1/phone-2022.jpg'}
                />
              </figure>

              <h3 className="text-center text-xl uppercase">Phone 2022</h3>
            </div>
          </section>
          <section className="flex w-full flex-1 items-center justify-around">
            <div className="flex  flex-col space-y-2">
              <figure className="random-border-radius-var-1 relative h-36 w-36 overflow-hidden md:h-40 md:w-40">
                <Image
                  fill
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  alt="education-1800s"
                  src={'https://i.ibb.co/V2Qw9Dv/education-1800s-2.jpg'}
                />
              </figure>

              <h3 className="text-center text-xl uppercase">Education 1800s</h3>
            </div>

            <ArrowsRightLeftIcon className="h-10 w-10 text-indigo-700" />

            <div className="flex  flex-col space-y-2">
              <figure className="random-border-radius-var-1 relative h-36 w-36 overflow-hidden md:h-40 md:w-40">
                <Image
                  fill
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  alt="phone-2022"
                  src={'https://i.ibb.co/nftBzc1/education-now.jpg'}
                />
              </figure>

              <h3 className="text-center text-xl uppercase">Education now</h3>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
