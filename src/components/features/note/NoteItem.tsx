import { memo, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Else, If, Then } from 'react-if';
import RemoveButton from '~/components/buttons/RemoveButton';
import ClientOnly from '~/components/shared/ClientOnly';
import Editor from '~/components/shared/Editor';
import useLecture from '~/contexts/LearningContext';
import { getTime } from '~/utils/numberHandler';
import { trpc } from '~/utils/trpc';

import { PencilIcon } from '@heroicons/react/24/solid';

import type { Note } from '@prisma/client';
import type QuillComponent from 'react-quill';

interface NoteItemProps {
  note: Note;
  refetchNotes: () => void;
}

function NoteItem({ note, refetchNotes }: NoteItemProps) {
  const lectureCtx = useLecture();
  const [editable, setEditable] = useState(false);

  const editorRef = useRef<QuillComponent | null>(null);

  const {
    mutate: removeNote,
    isError: isRemoveError,
    isSuccess: isRemoveSuccess,
  } = trpc.user.deleteNote.useMutation();

  const {
    mutate: updateNote,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
  } = trpc.user.updateNote.useMutation();

  const handleRemoveNote = (id: string) => {
    removeNote({ id });
  };

  const handleUpdateNote = (id: string) => {
    const payload = { id, content: (editorRef.current?.value as string) || '' };

    // just update when new content diff old content
    if (payload.content !== note.content && payload.content) {
      updateNote(payload);
      setEditable(false);
    } else {
      setEditable(false);
    }
  };

  useEffect(() => {
    if (isRemoveError || isUpdateError) {
      toast.error('Opps! Có lỗi xảy ra, thử lại sau!');
    }

    if (isRemoveSuccess || isUpdateSuccess) {
      refetchNotes();
    }
  }, [isRemoveError, isRemoveSuccess, isUpdateSuccess, isUpdateError]);

  return (
    <li className="flex min-h-[300px] flex-col space-y-4 rounded-xl bg-light-background px-3 py-2 dark:bg-black">
      <div className="flex items-center space-x-2">
        <span className="h-fit w-fit rounded-xl bg-white px-3 py-2 text-lg text-gray-600">
          {getTime(note.notchedAt)}
        </span>
        <h2 className="text-lg font-bold line-clamp-2 dark:text-primary md:text-xl">
          Chương:{' '}
          {(lectureCtx?.course &&
            lectureCtx.course.chapters.find(
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              (chapter) => chapter.id === note.chapterId,
            )?.title) ||
            ''}
        </h2>
      </div>

      <h3 className="text-lg">
        {lectureCtx?.allLecturesByChapters.find(
          (lc) => lc.id === note.lectureId,
        )?.title || ''}
      </h3>

      <If condition={editable}>
        <Then>
          <ClientOnly>
            <Editor
              getInstance={(editor) => {
                editorRef.current = editor;
              }}
              removeMessage="Huỷ"
              contents={note?.content || ''}
              handleCancel={() => {
                setEditable(false);
              }}
              onSubmit={() => {
                handleUpdateNote(note.id);
              }}
            />
          </ClientOnly>
        </Then>

        <Else>
          <article
            className={`prose-sm prose min-h-[10rem] min-w-full overflow-x-hidden rounded-xl  border border-dashed border-gray-500 px-3 py-2 text-gray-600 prose-img:rounded-2xl dark:text-white/80 lg:prose-xl`}
            dangerouslySetInnerHTML={{ __html: note?.content || '' }}
          ></article>

          <div className="flex w-full justify-end space-x-4">
            <button
              onClick={() => setEditable(true)}
              className="smooth-effect rounded-xl p-4 hover:bg-white dark:hover:bg-dark-background"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
            <RemoveButton
              removeAction={() => {
                handleRemoveNote(note.id);
              }}
            />
          </div>
        </Else>
      </If>
    </li>
  );
}

export default memo(NoteItem);
