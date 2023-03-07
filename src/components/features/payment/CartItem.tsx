import React from 'react';
import Image from 'next/image';
import { TagIcon, XMarkIcon, HeartIcon } from '@heroicons/react/24/outline';

export default function CartItem() {
  return (
    <li className="flex space-x-2 rounded-xl bg-white dark:bg-dark-background">
      <div className="w-[30%] p-2">
        <figure className="relative overflow-hidden rounded-xl bg-red-500 pb-[56.25%] md:rounded-2xl">
          <Image
            alt="courser-thumbnail"
            src={
              'https://upcdn.io/kW15b58/raw/uploads/2023/03/01/image-21-zTrP.png'
            }
            fill
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          />

          <p className="absolute bottom-1 right-1 flex items-center justify-center  space-x-2 rounded-lg bg-rose-100 p-2 text-sm font-bold text-rose-700 md:text-xl">
            <TagIcon className="inline-block h-4 w-4" />
            <span>
              {new Intl.NumberFormat('en', { notation: 'standard' }).format(
                960_000,
              )}{' '}
              vnđ
            </span>
          </p>
        </figure>
      </div>

      <div className="flex flex-1 py-2">
        <div className="flex w-[80%] flex-col justify-between  lg:w-[70%] ">
          <div className="flex flex-col space-y-0 lg:space-y-2">
            <h3 className="font-bold line-clamp-1 lg:line-clamp-2">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime
              corrupti delectus numquam dignissimos et ut magni odit nobis
              minima ipsum omnis, atque ex a at possimus corporis tempore dolor.
              Veritatis!
            </h3>
            <h4 className="text-xl md:text-2xl">Lorem, ipsum dolor</h4>
          </div>

          <div className="space-x-2 text-xl md:text-2xl">
            <span>5 chương •</span>
            <span>10 bài học •</span>
            <span>Sơ cấp</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-end justify-between p-2 lg:justify-evenly lg:p-4">
          <button className="rounded-full p-2 hover:border hover:border-gray-600 dark:hover:border-white">
            <XMarkIcon className="h-8 w-8" />
          </button>

          <button className="rounded-full p-2 hover:border hover:border-gray-600 dark:hover:border-white">
            <HeartIcon className="h-8 w-8" />
          </button>
        </div>
      </div>
    </li>
  );
}
