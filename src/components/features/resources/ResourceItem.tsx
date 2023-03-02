import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { memo } from 'react';
import type { ResourceType } from '~/types';

interface ResourceItemProps {
  resource: ResourceType;
}

function ResourceItem({ resource }: ResourceItemProps) {
  return (
    <li className="cursor-pointer rounded-xl bg-white py-4 px-2 hover:outline-dashed dark:bg-dark-background">
      <a
        className="flex items-center space-x-4"
        href={resource.url}
        target="_blank"
        rel="noreferrer"
      >
        <DocumentArrowDownIcon className="h-8 min-h-[28px] w-8 min-w-[24px] md:min-h-[28px] md:min-w-[32px]" />

        <span className="line-clamp-1">{resource.name}</span>
      </a>
    </li>
  );
}

export default memo(ResourceItem);
