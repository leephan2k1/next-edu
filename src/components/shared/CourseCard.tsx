import { memo } from 'react';
import Image from 'next/image';
import { BsStarFill } from 'react-icons/bs';
import Link from 'next/link';

function CourseCard() {
  return (
    <div className="smooth-effect aspect-h-6 aspect-w-4 relative rounded-2xl border-2 border-gray-600 hover:scale-[95%] dark:border-white/50">
      {/* <div className="absolute top-0 left-0 z-30 h-fit w-fit rounded-xl bg-primary p-2">
        <h1 className="text-lg text-black md:text-xl">Được mua nhiều</h1>
      </div> */}
      <Link
        href={'/'}
        className="flex h-full flex-col overflow-hidden px-2 py-3"
      >
        <figure className="aspect-w-5 aspect-h-3 relative overflow-hidden rounded-2xl">
          <Image
            alt="course-thumbnail"
            fill
            src={'https://img-b.udemycdn.com/course/240x135/851712_fc61_6.jpg'}
            className="absolute inset-0 h-auto w-full bg-cover bg-center bg-no-repeat"
          />
        </figure>
        <h1 className="overflow-hidden px-2 text-xl font-bold line-clamp-2 md:my-3 md:text-2xl">
          Python Lmao Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Repudiandae saepe veniam minima enim. Natus eos optio magnam, tenetur
          at voluptas sint libero placeat laudantium non tempore adipisci ex
          labore fugit.
        </h1>
        <h2 className="px-2 text-lg font-light line-clamp-1 dark:text-white/80 md:text-xl">
          Author Lmao Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Eum corporis dignissimos similique veritatis eveniet, commodi,
          possimus fuga voluptates exercitationem consequatur atque, in quod
          quisquam aspernatur recusandae doloribus quo velit quaerat!
        </h2>

        <div className="my-2 flex items-center px-2 text-lg md:space-x-2 md:text-xl">
          <span className="mr-2">5.0</span>
          <BsStarFill className="h-5 w-5 text-yellow-300" />
          <BsStarFill className="h-5 w-5 text-yellow-300" />
          <BsStarFill className="h-5 w-5 text-yellow-300" />
          <BsStarFill className="h-5 w-5 text-yellow-300" />
          <BsStarFill className="h-5 w-5 text-yellow-300" />
        </div>

        <div className="flex w-full flex-1 items-center space-x-2 px-2">
          <h3 className="text-lg font-bold text-rose-400 md:text-2xl">
            Miễn phí
            {/* {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(1950000)} */}
          </h3>
        </div>
      </Link>
    </div>
  );
}

export default memo(CourseCard);
