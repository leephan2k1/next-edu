import { type NextPage } from 'next';
import FilterPanel from '~/components/features/browse/FilterPanel';
import FilterResult from '~/components/features/browse/FilterResult';

const BrowsePage: NextPage = () => {
  return (
    <div className="mx-auto min-h-screen w-full px-4 pt-10 md:max-w-[720px] lg:max-w-[1200px]">
      <FilterPanel />

      <FilterResult />
    </div>
  );
};

export default BrowsePage;
