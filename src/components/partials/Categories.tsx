import { categories } from '~/constants';
import CategoriesDropDown from './CategoriesDropDown';

export default function Categories() {
  return (
    <section className="mt-6 hidden w-full space-x-4 px-4 md:flex">
      <CategoriesDropDown />

      {categories.length > 0 &&
        categories.map((category) => {
          return (
            <button
              key={String(Math.random())}
              className="smooth-effect rounded-3xl p-2 hover:bg-primary hover:px-3 hover:text-gray-500 dark:hover:text-gray-600"
            >
              {category}
            </button>
          );
        })}
    </section>
  );
}
