import { memo } from 'react';
import Editor from '~/components/shared/Editor';
import CurrentTimeBtn from './CurrentTimeBtn';

function NoteContainer() {
  return (
    <>
      <div className="my-6 flex h-fit w-fit items-center space-x-4 rounded-2xl bg-white p-4 text-base text-gray-600 md:text-xl">
        <span>Ghi chú tại</span> <CurrentTimeBtn />
      </div>

      <Editor />
    </>
  );
}

export default memo(NoteContainer);
