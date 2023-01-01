import { ChevronRightIcon } from '@heroicons/react/24/outline';

export default function Breadcrumbs() {
  return (
    <ul className="flex max-h-[10rem] items-center space-x-4 overflow-hidden whitespace-nowrap text-2xl">
      <li className="max-w-[10rem] overflow-hidden">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto,
        atque laudantium omnis nisi ex minus facilis qui cumque illum iure quis,
        unde vero doloremque! Ipsum ad tempore perspiciatis. Quisquam, hic.
      </li>

      <ChevronRightIcon className="h-6 w-6" />

      <li className="max-w-[10rem] overflow-hidden">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto,
        atque laudantium omnis nisi ex minus facilis qui cumque illum iure quis,
        unde vero doloremque! Ipsum ad tempore perspiciatis. Quisquam, hic.
      </li>

      <ChevronRightIcon className="h-6 w-6" />

      <li className="max-w-[10rem] overflow-hidden">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto,
        atque laudantium omnis nisi ex minus facilis qui cumque illum iure quis,
        unde vero doloremque! Ipsum ad tempore perspiciatis. Quisquam, hic.
      </li>
    </ul>
  );
}
