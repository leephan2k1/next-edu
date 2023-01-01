import { ClockIcon, HeartIcon, UserIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { BsStarFill } from 'react-icons/bs';
import CourseSidebar from '~/components/courses/CourseSidebar';
import Breadcrumbs from '../shared/Breadcrumbs';

export default function CourseHeader() {
  return (
    <div className="relative w-full bg-white py-10 text-gray-600 dark:bg-dark-background dark:text-white/60 lg:px-6 lg:py-6">
      <div className="mx-auto flex w-full flex-col items-center  md:max-w-[720px] lg:max-w-[1200px] lg:flex-row lg:items-start lg:justify-center">
        <div className="my-auto flex flex-col items-center space-y-6 md:max-w-[80%] lg:max-w-[70%] lg:items-start">
          <Breadcrumbs />

          {/* demo thumbnail  */}
          <div className="w-[80%] lg:hidden">
            <div className="relative overflow-hidden rounded-2xl pb-[56.25%]">
              <Image
                className="absolute inset-0 bg-center bg-no-repeat"
                fill
                alt="course-thumbnail"
                src={
                  'https://img-b.udemycdn.com/course/750x422/1565838_e54e_16.jpg'
                }
              />
            </div>
          </div>

          <div className="flex max-w-[70%] flex-col space-y-6">
            <h1 className="text-4xl font-semibold lg:text-5xl">
              30-Day Money-Back Guarantee Development Web Development The
              Complete 2023 Web Development Bootcamp
            </h1>

            <h2 className="text-2xl lg:text-3xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
              delectus eius id ipsam ratione. Libero tempora rerum consequuntur
              fugit atque neque dolores cum, exercitationem sint similique dicta
              tempore sequi officiis. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Dolore delectus eius id ipsam ratione.
            </h2>

            <div className="flex flex-col items-start md:flex-row md:items-center md:space-x-4">
              <div className="flex items-center space-x-4">
                <span className="inline-block">5.0</span>

                <div className="flex space-x-2">
                  <BsStarFill className="h-5 w-5 text-yellow-500" />
                  <BsStarFill className="h-5 w-5 text-yellow-500" />
                  <BsStarFill className="h-5 w-5 text-yellow-500" />
                  <BsStarFill className="h-5 w-5 text-yellow-500" />
                  <BsStarFill className="h-5 w-5 text-yellow-500" />
                </div>
              </div>

              <div className="flex">
                <span>(100 đánh giá)</span>
                <span className="mx-2">|</span>
                <span>100 học sinh</span>
              </div>
            </div>

            <h3 className="flex items-center md:space-x-2">
              <UserIcon className="hidden h-6 w-6 md:inline-block" />
              <span>Người hướng dẫn: </span>
              <Link className="text-blue-500" href="/">
                Lorem ipsum dolor
              </Link>
            </h3>

            <h5 className="flex items-center space-x-2">
              <ClockIcon className="h-6 w-6" />{' '}
              <span>Cập nhật lần cuối: 11/2022</span>
            </h5>
          </div>

          <div className="mx-auto flex w-[70%] space-x-6 lg:hidden">
            <button className="btn-primary btn-lg btn w-[80%] grow">
              Thêm vào giỏ hàng
            </button>
            <button className="btn-ghost btn-active btn-lg btn flex-1 text-gray-600 dark:text-white/60">
              <HeartIcon className="h-8 w-8" />
            </button>
          </div>
        </div>

        <CourseSidebar />
      </div>
    </div>
  );
}
