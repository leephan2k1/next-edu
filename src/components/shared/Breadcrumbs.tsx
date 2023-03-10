import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { PATHS, QUERY_FILTERS } from '~/constants';

interface BreadcrumbsProps {
  category: string;
  subCategory: string;
}

export default function Breadcrumbs({
  category,
  subCategory,
}: BreadcrumbsProps) {
  return (
    <ul className="flex max-h-[10rem] items-center space-x-4 overflow-hidden whitespace-nowrap text-2xl">
      <li className="overflow-hidden hover:text-yellow-500">
        <Link href={`/${PATHS.BROWSE}?${QUERY_FILTERS.CATEGORY}=${category}`}>
          {category}
        </Link>
      </li>

      <ChevronRightIcon className="h-6 w-6" />

      <li className="overflow-hidden hover:text-yellow-500">
        <Link
          href={`/${PATHS.BROWSE}?${QUERY_FILTERS.SUB_CATEGORY}=${subCategory}`}
        >
          {subCategory}
        </Link>
      </li>
    </ul>
  );
}
