import { memo } from 'react';
import ChatSessions from './ChatSessions';
import ChatContainer from './ChatContainer';

function Messages() {
  return (
    <div className="flex w-full flex-col p-6 md:flex-row">
      <ChatSessions />

      <ChatContainer />
    </div>
  );
}

export default memo(Messages);
