import type { Dispatch, SetStateAction } from 'react';
import { memo, useState } from 'react';
import Balancer from 'react-wrap-balancer';
import { inter } from '~/constants';

import { ImgComparisonSlider } from '@img-comparison-slider/react';

const select_options = [
  {
    title: 'car',
    label: 'ô tô',
    img: ['/images/car-1886.png', '/images/car-2020-Custom.png'],
  },
  {
    title: 'phone',
    label: 'điện thoại',
    img: ['/images/phone-1876-Custom.jpg', '/images/phone-2022-Custom.jpg'],
  },
  {
    title: 'education',
    label: 'giáo dục',
    img: [
      '/images/education-1800s-2-Custom.jpg',
      '/images/education-now-Custom.jpg',
    ],
  },
];

const SelectBannerView = ({
  selectImgIndex,
}: {
  selectImgIndex: Dispatch<SetStateAction<number>>;
}) => {
  const [selectIndex, setSelectIndex] = useState(0);

  return (
    <div className="btn-group">
      {select_options.length > 0 &&
        select_options.map((option, index) => {
          return (
            <button
              key={option.title}
              onClick={() => {
                selectImgIndex(index);
                setSelectIndex(index);
              }}
              className={`btn ${selectIndex === index ? 'btn-active' : ''}`}
            >
              {option.label}
            </button>
          );
        })}
    </div>
  );
};

function Banner() {
  const [selectIndex, setSelectIndex] = useState(0);

  return (
    <div className="my-6 h-fit w-full text-gray-800 dark:text-white">
      <div className="mx-auto flex h-full max-w-[1300px] flex-col md:flex-row">
        <aside className="absolute-center flex-1 p-10">
          <div className="full-size flex flex-col items-center justify-center space-y-6">
            <h1
              style={{
                fontFamily: inter.style.fontFamily,
              }}
              className="text-6xl font-semibold capitalize md:w-full md:text-7xl md:leading-[5rem] lg:text-8xl"
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

        <aside className="absolute-center relative flex-1 flex-col space-y-8 p-10">
          <div className="random-border-radius-var-1 overflow-hidden lg:w-4/5">
            <ImgComparisonSlider>
              <img
                className="min-h-[350px] w-full"
                slot="first"
                src={select_options[selectIndex]?.img[0]}
              />
              <img
                className="min-h-[350px] w-full"
                slot="second"
                src={select_options[selectIndex]?.img[1]}
              />
            </ImgComparisonSlider>
          </div>

          <SelectBannerView selectImgIndex={setSelectIndex} />
        </aside>
      </div>
    </div>
  );
}

export default memo(Banner);
