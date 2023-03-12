import Link from 'next/link';
import { memo, useEffect, useRef } from 'react';
import { useHover } from 'usehooks-ts';

import { ChevronRightIcon } from '@heroicons/react/24/outline';

function CategoryItem({
  title,
  displayArrow,
  setHoverKey,
  path,
}: {
  path: string;
  title: string;
  displayArrow?: boolean;
  setHoverKey?: (state: string) => void;
}) {
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);

  useEffect(() => {
    if (isHover && setHoverKey) {
      setHoverKey(title);
    }
  }, [isHover]);

  return (
    <li ref={hoverRef} key={title}>
      <Link
        href={path}
        className="smooth-effect dropdown-hover dropdown flex w-full items-center  justify-between space-x-4 whitespace-nowrap py-2 px-6 hover:text-yellow-500"
      >
        <label tabIndex={0} className="cursor-pointer">
          {title}
        </label>

        {displayArrow && <ChevronRightIcon className="h-5 w-5" />}
      </Link>
    </li>
  );
}

export default memo(CategoryItem);
