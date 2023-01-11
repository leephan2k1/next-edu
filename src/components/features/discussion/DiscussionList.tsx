import { memo } from 'react';
import DiscussionItem from './DiscussionItem';

function DiscussionList() {
  return (
    <div className="mt-6 w-full">
      <ul className="flex flex-col px-4">
        <DiscussionItem />
      </ul>
    </div>
  );
}

export default memo(DiscussionList);
