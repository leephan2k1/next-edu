import 'swiper/css';
import 'swiper/css/pagination';

import { memo, useRef } from 'react';
import { FreeMode, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { inter } from '~/constants';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

import TestimonialCard from '../shared/TestimonialCard';

import type { Review } from '@prisma/client';
import type { Swiper as SwiperCore } from 'swiper/types';

const swiperBreakPoints = {
  1: {
    slidesPerView: 1,
    spaceBetween: 20,
  },
  640: {
    slidesPerView: 2,
    spaceBetween: 30,
  },
};

interface TestimonialProps {
  latestReviews: Review[];
}

function Testimonial({ latestReviews }: TestimonialProps) {
  const swiperRef = useRef<SwiperCore>();

  return (
    <div className="mt-20 w-full text-gray-600 ">
      <h1
        style={{
          fontFamily: inter.style.fontFamily,
        }}
        className="mb-10 text-center text-3xl font-bold dark:text-white md:text-4xl"
      >
        Đánh giá mới nhất từ người dùng
      </h1>

      <div className="mx-auto w-full px-10 lg:w-3/4">
        {latestReviews && latestReviews.length > 0 && (
          <Swiper
            loop
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            breakpoints={swiperBreakPoints}
            modules={[Pagination, FreeMode]}
          >
            {latestReviews.map((review) => {
              return (
                <SwiperSlide key={review.id}>
                  <TestimonialCard review={review} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}

        <div className="mt-4 flex w-full items-center justify-center space-x-6">
          <button
            onClick={() => {
              swiperRef.current?.slidePrev();
            }}
            className="btn-lg btn-circle btn border-gray-500 dark:bg-white lg:btn-md"
          >
            <ChevronLeftIcon className="h-8 w-8 dark:text-gray-500" />
          </button>
          <button
            onClick={() => {
              swiperRef.current?.slideNext();
            }}
            className="btn-lg btn-circle btn border-gray-500 dark:bg-white lg:btn-md"
          >
            <ChevronRightIcon className="h-8 w-8 dark:text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(Testimonial);
