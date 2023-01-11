import { memo } from 'react';
import Editor from '~/components/shared/Editor';
import CurrentTimeBtn from './CurrentTimeBtn';
import ClientOnly from '~/components/shared/ClientOnly';
import { ListBulletIcon } from '@heroicons/react/24/outline';
import { useSetAtom } from 'jotai';
import { listNoteModalState } from '~/atoms/listNoteModal';

function NoteContainer() {
  const openListNoteModal = useSetAtom(listNoteModalState);

  return (
    <>
      <div className="flex w-full items-center space-x-4 px-2">
        <div className="my-6 flex h-fit w-fit items-center space-x-4 rounded-xl bg-white p-4 text-base text-gray-600 shadow-lg md:text-xl">
          <span>Ghi chú tại</span> <CurrentTimeBtn />
        </div>

        <button
          onClick={() => openListNoteModal(true)}
          className="btn-follow-theme btn flex items-center space-x-2 md:btn-lg"
        >
          <ListBulletIcon className="h-8 w-8" />
          <span>Danh sách ghi chú</span>
        </button>
      </div>

      <ClientOnly>
        <Editor />
      </ClientOnly>
    </>
  );
}

export default memo(NoteContainer);
