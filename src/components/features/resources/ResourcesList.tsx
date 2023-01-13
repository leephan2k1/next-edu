import { memo } from 'react';
import ResourceItem from './ResourceItem';

function ResourcesList() {
  return (
    <div className="w-full px-4">
      <h1 className="mb-4 text-center text-2xl capitalize md:text-3xl">
        Tài nguyên học liệu
      </h1>

      <ul className="mx-auto flex flex-col space-y-6 lg:w-3/4">
        <ResourceItem />
        <ResourceItem />
        <ResourceItem />
        <ResourceItem />
      </ul>
    </div>
  );
}

export default memo(ResourcesList);
