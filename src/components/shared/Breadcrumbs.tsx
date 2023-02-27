import { ChevronRightIcon } from '@heroicons/react/24/outline';

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
      <li className="max-w-[10rem] overflow-hidden">{category}</li>

      <ChevronRightIcon className="h-6 w-6" />

      <li className="max-w-[10rem] overflow-hidden">{subCategory}</li>
    </ul>
  );
}
