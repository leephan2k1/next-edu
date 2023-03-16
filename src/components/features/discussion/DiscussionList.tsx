import { memo } from 'react';
import Loading from '~/components/buttons/Loading';

import DiscussionItem from './DiscussionItem';

import useDiscussion from '~/contexts/DiscussionContext';

function DiscussionList() {
  const discussionCtx = useDiscussion();

  return (
    <div className="mt-6 w-full">
      {discussionCtx?.discussions && discussionCtx.discussions.length > 0 ? (
        <ul className="flex flex-col px-4">
          {discussionCtx.discussions.map((discussion) => {
            return (
              <DiscussionItem key={discussion.id} discussion={discussion} />
            );
          })}
        </ul>
      ) : discussionCtx?.discussions &&
        discussionCtx.discussions?.length === 0 ? null : (
        <div className="absolute-center min-h-[20rem] w-full">
          <Loading />
        </div>
      )}
    </div>
  );
}

export default memo(DiscussionList);
