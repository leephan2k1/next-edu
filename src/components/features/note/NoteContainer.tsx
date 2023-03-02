import { memo, useRef, useEffect } from 'react';
import Editor from '~/components/shared/Editor';
import CurrentTimeBtn from './CurrentTimeBtn';
import ClientOnly from '~/components/shared/ClientOnly';
import { ListBulletIcon } from '@heroicons/react/24/outline';
import { useSetAtom } from 'jotai';
import { listNoteModalState } from '~/atoms/listNoteModal';
import type QuillComponent from 'react-quill';
import useLecture from '~/contexts/LearningContext';
import { videoCurrentTime } from '~/atoms/videoCurrentTime';
import { useAtomValue } from 'jotai';
import { trpc } from '~/utils/trpc';
import toast from 'react-hot-toast';

function NoteContainer() {
  const videoCurrentTimeValue = useAtomValue(videoCurrentTime);
  const editorRef = useRef<QuillComponent | null>(null);
  const lectureCtx = useLecture();

  const openListNoteModal = useSetAtom(listNoteModalState);

  const {
    mutate: addNote,
    isSuccess,
    isError,
    isLoading,
  } = trpc.user.addNote.useMutation();

  const handleSubmitNote = () => {
    const payload = {
      content: editorRef.current?.value,
      chapterId: lectureCtx?.currentLecture?.chapterId,
      lectureId: lectureCtx?.currentLecture?.id,
      notchedAt: videoCurrentTimeValue,
    };

    for (const key in payload) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      if (!payload[key]) {
        toast.error('Oops! Có lỗi xảy ra, thử lại sau!');
        return;
      }
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    addNote(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Thêm ghi chú thành công');
    }
    if (isError) {
      toast.error('Oops! Có lỗi xảy ra, thử lại sau!');
    }
  }, [isSuccess, isError]);

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
        <Editor
          key={String(isSuccess)}
          contents={isSuccess ? '' : undefined}
          isLoadingSubmit={isLoading}
          onSubmit={() => {
            handleSubmitNote();
          }}
          getInstance={(editor) => {
            editorRef.current = editor;
          }}
        />
      </ClientOnly>
    </>
  );
}

export default memo(NoteContainer);
