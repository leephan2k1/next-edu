import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { memo, useEffect, useRef } from 'react';
import { useHover } from 'usehooks-ts';

function CategoryItem({
  title,
  displayArrow,
  setHoverKey,
}: {
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
    <li
      ref={hoverRef}
      className="smooth-effect dropdown-hover dropdown flex w-full items-center  justify-between space-x-4 whitespace-nowrap py-2 px-6 hover:text-yellow-500"
      key={title}
    >
      <label tabIndex={0} className="cursor-pointer">
        {title}
      </label>

      {displayArrow && <ChevronRightIcon className="h-5 w-5" />}
    </li>
  );
}

export default memo(CategoryItem);
