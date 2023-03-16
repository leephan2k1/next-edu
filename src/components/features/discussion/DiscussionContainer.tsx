import useDiscussion, {
  DiscussionContextProvider,
} from '~/contexts/DiscussionContext';
import DiscussionList from './DiscussionList';
import DiscussStandalone from './DiscussStandalone';

function DiscussionBody() {
  const discussionCtx = useDiscussion();

  return (
    <>
      <h2 className="my-4 px-2 text-right font-bold">
        {discussionCtx?.discussions?.length || 0} Hỏi đáp
      </h2>

      <DiscussStandalone
        inputType="discuss"
        refetch={() => {
          discussionCtx?.refetch();
        }}
      />
    </>
  );
}

export default function DiscussionContainer() {
  return (
    <DiscussionContextProvider>
      <div className="flex flex-col px-4">
        <DiscussionBody />

        <DiscussionList />
      </div>
    </DiscussionContextProvider>
  );
}
