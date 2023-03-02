import DiscussStandalone from './DiscussStandalone';
import DiscussionList from './DiscussionList';

export default function DiscussionContainer() {
  return (
    <div className="flex flex-col px-4">
      <h2 className="my-4 px-2 text-right font-bold">30 Hỏi đáp</h2>

      <DiscussStandalone inputType="discuss" />

      <DiscussionList />
    </div>
  );
}
