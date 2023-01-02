import 'swiper/css';
import 'swiper/css/pagination';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useRef } from 'react';
import { FreeMode, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperCore } from 'swiper/types';
import ModernCourseCard from '../shared/ModernCourseCard';

const swiperBreakPoints = {
  1: {
    slidesPerView: 2,
  },
  640: {
    slidesPerView: 4,
  },
};

export default function RelatedCourses() {
  const swiperRef = useRef<SwiperCore>();

  return (
    <section className="mx-auto w-full lg:w-[70%]">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-semibold md:text-3xl">
          Khoá học liên quan
        </h1>

        <button
          onClick={() => {
            swiperRef.current?.slidePrev();
          }}
          className="btn-follow-theme btn-circle btn"
        >
          <ChevronLeftIcon className="h-8 w-8" />
        </button>
        <button
          onClick={() => {
            swiperRef.current?.slideNext();
          }}
          className="btn-follow-theme btn-circle btn"
        >
          <ChevronRightIcon className="h-8 w-8" />
        </button>
      </div>

      <div className="w-full">
        <Swiper
          loop
          spaceBetween={10}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={swiperBreakPoints}
          modules={[Pagination, FreeMode]}
        >
          <SwiperSlide>
            <ModernCourseCard />
          </SwiperSlide>
          <SwiperSlide>
            <ModernCourseCard />
          </SwiperSlide>
          <SwiperSlide>
            <ModernCourseCard />
          </SwiperSlide>
          <SwiperSlide>
            <ModernCourseCard />
          </SwiperSlide>
          <SwiperSlide>
            <ModernCourseCard />
          </SwiperSlide>
          <SwiperSlide>
            <ModernCourseCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
