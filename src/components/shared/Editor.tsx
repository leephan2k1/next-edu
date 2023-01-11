import 'react-quill/dist/quill.snow.css';

import { memo, useEffect, useRef, useState } from 'react';
import type QuillComponent from 'react-quill';
import Loading from '../buttons/Loading';
import { useAtom } from 'jotai';
import { quillEditorState } from '~/atoms/quillEditorState';
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const ReactQuill =
  typeof window === 'object' ? require('react-quill') : () => false;

interface EditorProps {
  contents?: string;
  handleCancel?: () => void;
}

function Editor({ contents, handleCancel }: EditorProps) {
  const [editorState, setEditorState] = useAtom(quillEditorState);
  const [value, setValue] = useState<string>(contents || '');
  const quillRef = useRef<QuillComponent | null>(null);

  if (editorState) {
    window.scrollTo(0, document.body.scrollHeight);
    quillRef.current?.focus();
  }

  useEffect(() => {
    if (editorState) {
      setEditorState(false);
    }
  }, [editorState]);

  return (
    <div className="full-size flex flex-col items-end space-y-4 px-2">
      <ReactQuill
        ref={quillRef}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic'],
            [{ list: 'ordered' }, { list: 'bullet' }],
          ],
        }}
        className="w-full"
        theme="snow"
        value={value}
        onChange={setValue}
      />
      <div className="flex items-center space-x-4">
        <button
          onClick={() => {
            if (handleCancel) {
              handleCancel();
            } else {
              setValue('');
            }
          }}
          className="absolute-center h-[4rem] w-fit rounded-xl bg-white py-3 px-4 text-gray-600 shadow-lg"
        >
          <span>Huỷ bỏ</span>
        </button>
        <button className="absolute-center h-[4rem] w-[5rem] rounded-xl bg-white py-3 px-4 text-gray-600 shadow-lg">
          {/* <span>Lưu</span> */}
          <Loading />
        </button>
      </div>
    </div>
  );
}

export default memo(Editor);
