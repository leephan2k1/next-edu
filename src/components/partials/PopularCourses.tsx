import 'swiper/css';
import 'swiper/css/pagination';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { memo, useRef } from 'react';
import { FreeMode, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperCore } from 'swiper/types';
import CourseCard from '~/components/shared/CourseCard';
// import SwiperButton from '../buttons/SwiperButton';

const swiperBreakPoints = {
  1: {
    slidesPerView: 2,
    spaceBetween: 2,
  },
  320: {
    spaceBetween: 5,
    slidesPerView: 3,
  },
  480: {
    slidesPerView: 4,
  },
  640: {
    slidesPerView: 5,
    spaceBetween: 10,
  },
  1300: {
    spaceBetween: 20,
    slidesPerView: 7,
  },
};

function PopularCourses() {
  // use navigate without useSwiper hook https://github.com/nolimits4web/swiper/issues/3855#issuecomment-1287871054
  const swiperRef = useRef<SwiperCore>();

  return (
    <div className="my-6 h-fit w-full text-gray-800 dark:text-white">
      <div className="absolute-center w-full space-x-4">
        <button
          onClick={() => {
            swiperRef.current?.slidePrev();
          }}
          className="absolute-center smooth-effect hover:scale-[120%]"
        >
          <ChevronLeftIcon className="h-8 w-8" />
        </button>
        <h1 className="center text-3xl font-bold capitalize md:text-4xl">
          khoá học phổ biến
        </h1>
        <button
          onClick={() => {
            swiperRef.current?.slideNext();
          }}
          className="absolute-center"
        >
          <ChevronRightIcon className="smooth-effect h-8 w-8 hover:scale-[120%]" />
        </button>
      </div>

      <div className="mx-auto my-4 w-full px-3 md:px-6">
        <Swiper
          loop
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={swiperBreakPoints}
          modules={[Pagination, FreeMode]}
        >
          <SwiperSlide>
            <CourseCard />
          </SwiperSlide>
          <SwiperSlide>
            <CourseCard />
          </SwiperSlide>
          <SwiperSlide>
            <CourseCard />
          </SwiperSlide>
          <SwiperSlide>
            <CourseCard />
          </SwiperSlide>
          <SwiperSlide>
            <CourseCard />
          </SwiperSlide>
          <SwiperSlide>
            <CourseCard />
          </SwiperSlide>
          <SwiperSlide>
            <CourseCard />
          </SwiperSlide>
          <SwiperSlide>
            <CourseCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default memo(PopularCourses);
