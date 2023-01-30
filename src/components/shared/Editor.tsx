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
  getInstance?: (editor: QuillComponent) => void;
  onEditorChange?: (value: string) => void;
  onSubmit?: () => void;
  styles?: string;
  contents?: string;
  handleCancel?: () => void;
}

function Editor({
  contents,
  handleCancel,
  styles,
  getInstance,
  onEditorChange,
  onSubmit,
}: EditorProps) {
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

  useEffect(() => {
    if (getInstance && quillRef.current && typeof getInstance === 'function') {
      getInstance(quillRef.current);
    }
  }, [quillRef.current]);

  return (
    <div
      className={`${
        styles ? styles : ''
      } full-size flex flex-col items-end space-y-4 px-2`}
    >
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
        onChange={(value: string) => {
          setValue(value);

          if (onEditorChange && typeof onEditorChange === 'function') {
            onEditorChange(value);
          }
        }}
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
          <span>Xoá</span>
        </button>
        {onSubmit && (
          <button className="absolute-center h-[4rem] w-[5rem] rounded-xl bg-white py-3 px-4 text-gray-600 shadow-lg">
            {/* <span>Lưu</span> */}
            <Loading />
          </button>
        )}
      </div>
    </div>
  );
}

export default memo(Editor);
