import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Disclosure, useDisclosureState } from 'ariakit/disclosure';
import { memo } from 'react';
import CommentItem from './CommentItem';

function DiscussionItem() {
  const disclosure = useDisclosureState();

  return (
    <li className="flex flex-col space-y-4 rounded-2xl p-4">
      <CommentItem />

      <div className="ml-[17%] md:ml-[10%]">
        <Disclosure
          state={disclosure}
          className="smooth-effect my-2 flex w-fit items-center space-x-3 rounded-xl hover:text-yellow-500"
        >
          <span>Xem 2 câu trả lời</span> <ChevronDownIcon className="h-6 w-6" />
        </Disclosure>

        <ul className="flex flex-col">
          {disclosure.open && (
            <>
              <CommentItem />
              <CommentItem />
            </>
          )}
        </ul>
      </div>

      {/* <DiscussStandalone /> */}
    </li>
  );
}

export default memo(DiscussionItem);
