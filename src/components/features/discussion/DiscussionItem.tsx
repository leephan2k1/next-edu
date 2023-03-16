import { Disclosure, useDisclosureState } from 'ariakit/disclosure';
import { memo } from 'react';

import { ChevronDownIcon } from '@heroicons/react/24/outline';

import CommentItem from './CommentItem';

import type { Discussion } from '@prisma/client';

interface DiscussionItemProps {
  discussion: Discussion & {
    author: {
      id: string | null;
      name: string | null;
      image: string | null;
    };
    replies: (Discussion & {
      author: {
        id: string | null;
        name: string | null;
        image: string | null;
      };
    })[];
  };
}

function DiscussionItem({ discussion }: DiscussionItemProps) {
  const disclosure = useDisclosureState();

  return (
    <li className="flex flex-col space-y-4 rounded-2xl p-4">
      <CommentItem
        discussion={discussion}
        originalDiscussionId={discussion.id} // -> avoid nested reply (only reply 1 level)
      />

      <div className="ml-[17%] md:ml-[10%]">
        {discussion.replies.length > 0 && (
          <>
            <Disclosure
              state={disclosure}
              className="smooth-effect my-2 flex w-fit items-center space-x-3 rounded-xl hover:text-yellow-500"
            >
              <span>Xem {discussion.replies.length} câu trả lời</span>{' '}
              <ChevronDownIcon className="h-6 w-6" />
            </Disclosure>

            <ul className="flex flex-col">
              {disclosure.open &&
                discussion.replies.map((d) => {
                  return (
                    <CommentItem
                      key={d.id}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      //@ts-ignore
                      discussion={d}
                      originalDiscussionId={discussion.id}
                    />
                  );
                })}
            </ul>
          </>
        )}
      </div>
    </li>
  );
}

export default memo(DiscussionItem);
