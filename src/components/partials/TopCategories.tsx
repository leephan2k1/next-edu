import { inter } from '~/constants';
import {
  AcademicCapIcon,
  LightBulbIcon,
  FireIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import type { ReactNode } from 'react';

const dummy_top_categories = [
  {
    label: 'lập trình',
    backgroundColor: '#d2b6ff',
    Icon: AcademicCapIcon,
  },
  {
    label: 'học thuật',
    backgroundColor: '#abc5fe',
    Icon: LightBulbIcon,
  },
  {
    label: 'nghệ thuật',
    backgroundColor: '#ffbaaa',
    Icon: FireIcon,
  },
  { label: 'thiết kế', backgroundColor: '#ffea9f', Icon: SparklesIcon },
];

const TopCategoryItem = ({
  label,
  children,
  backgroundColor,
}: {
  label: string;
  backgroundColor?: string;
  children: ReactNode;
}) => {
  return (
    <div
      style={{ backgroundColor }}
      className="aspect-w-2 aspect-h-1 rounded-2xl border-2 border-gray-600 text-gray-600 dark:border-primary"
    >
      <div className="full-size absolute-center">
        <h1 className="max-w-[80%] text-2xl font-semibold capitalize line-clamp-1 md:text-3xl">
          {label}
        </h1>
      </div>
      <span className="absolute top-[85%] left-1/2 h-16 w-16 -translate-x-1/2 rounded-full bg-primary p-2">
        {children}
      </span>
    </div>
  );
};

export default function TopCategories() {
  return (
    <div className="w-full space-y-4 text-gray-600 dark:text-white">
      <h1
        style={{
          fontFamily: inter.style.fontFamily,
        }}
        className="text-center text-3xl font-bold md:text-4xl"
      >
        Top danh mục
      </h1>

      <div className="grid grid-cols-2 gap-y-16 gap-x-6 p-4 md:grid-cols-4">
        {dummy_top_categories.length > 0 &&
          dummy_top_categories.map((category) => {
            return (
              <TopCategoryItem
                backgroundColor={category.backgroundColor}
                label={category.label}
                key={category.label}
              >
                {<category.Icon className="text-gray-600" />}
              </TopCategoryItem>
            );
          })}
      </div>
    </div>
  );
}
