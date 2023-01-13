import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { memo } from 'react';

function ResourceItem() {
  return (
    <li className="flex cursor-pointer items-center space-x-4 rounded-xl bg-white py-4 px-2 hover:outline-dashed dark:bg-dark-background">
      <DocumentArrowDownIcon className="h-8 min-h-[28px] w-8 min-w-[24px] md:min-h-[28px] md:min-w-[32px]" />

      <span className="line-clamp-1">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem aliquid
        eius ratione. Dicta perferendis earum aut numquam. Quas, officiis, esse
        quam harum temporibus minus repellendus nostrum animi sint nesciunt
        placeat!
      </span>
    </li>
  );
}

export default memo(ResourceItem);
