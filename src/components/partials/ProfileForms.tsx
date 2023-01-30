import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { memo, useRef, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import type QuillComponent from 'react-quill';
import Editor from '../shared/Editor';

interface Inputs {
  linkedin: string;
  twitter: string;
  facebook: string;
  youtube: string;
  webUrl: string;
}

const validate = (instance: string, value: string): boolean => {
  switch (instance) {
    case 'editor':
      if (value.replace(/<\/?[^>]+(>|$)/g, '').length < 20) {
        return false;
      }

      return true;
    case 'summary':
      if (value.length > 60) {
        return false;
      }

      return true;
    default:
      return false;
  }
};

function ProfileForms() {
  const [errors, setErrors] = useState({
    summaryError: false,
    bioError: false,
  });
  const { register, handleSubmit } = useForm();
  const summaryInputRef = useRef<HTMLInputElement | null>(null);
  const [editor, setEditor] = useState<QuillComponent | null>(null);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (
      summaryInputRef.current?.value &&
      !validate('summary', summaryInputRef.current?.value)
    ) {
      setErrors((errors) => ({ ...errors, summaryError: true }));
      return;
    }

    if (
      String(editor?.value).replace(/<\/?[^>]+(>|$)/g, '') &&
      !validate('editor', editor?.value as string)
    ) {
      setErrors((errors) => ({ ...errors, bioError: true }));
      return;
    }
  };

  return (
    <div className="grid flex-1 grid-cols-1 py-6 lg:grid-cols-2 lg:gap-x-4">
      <div className="flex flex-col space-y-10">
        <div className="flex flex-col space-y-4 md:w-3/4">
          <label className="text-3xl">Tóm tắt</label>
          {errors.summaryError && (
            <span className="flex items-center text-xl italic text-rose-500">
              <ExclamationCircleIcon className="h-6 w-6" /> Tối đa 60 ký tự ký
              tự
            </span>
          )}

          <input
            onChange={() =>
              setErrors((errors) => {
                if (errors.summaryError) {
                  return { ...errors, summaryError: false };
                }
                return errors;
              })
            }
            ref={summaryInputRef}
            className="rounded-xl p-3 shadow focus:ring-1 focus:ring-white"
            type="text"
            placeholder="3 năm kinh nghiệm trong giảng dạy Toán..."
          />
        </div>

        <div className="flex flex-col space-y-4 rounded-xl">
          <label className="text-3xl">Tiểu sử</label>
          {errors.bioError && (
            <span className="flex items-center text-xl italic text-rose-500">
              <ExclamationCircleIcon className="h-6 w-6" /> Tiểu sử cần ít nhất
              20 ký tự
            </span>
          )}

          <Editor
            getInstance={(editor: QuillComponent) => {
              setEditor(editor);
            }}
            onEditorChange={() => {
              setErrors((errors) => {
                if (errors.bioError) {
                  return { ...errors, bioError: false };
                }
                return errors;
              });
            }}
            styles="space-y-20 "
          />
        </div>
      </div>

      <div className="flex flex-col px-4">
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore  */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-10">
          <div className="flex flex-col space-y-4 md:w-4/5">
            <label className="text-3xl">Website</label>
            <input
              {...register('webUrl')}
              className="rounded-xl p-3 shadow focus:ring-1 focus:ring-white"
              type="text"
              placeholder="url"
            />
          </div>

          <div className="flex flex-col space-y-4 md:w-4/5">
            <label className="text-3xl">Linkedin</label>
            <div className="flex items-center">
              <span className="h-full">https://www.linkedin.com/</span>
              <input
                {...register('linkedin')}
                className="w-full rounded-xl p-3 shadow focus:ring-1 focus:ring-white"
                type="text"
                placeholder="resource id"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-4 md:w-4/5">
            <label className="text-3xl">Twitter</label>
            <div className="flex items-center">
              <span className="h-full">https://twitter.com/</span>
              <input
                {...register('twitter')}
                className="w-full rounded-xl p-3 shadow focus:ring-1 focus:ring-white"
                type="text"
                placeholder="Username"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-4 md:w-4/5">
            <label className="text-3xl">Facebook</label>
            <div className="flex items-center">
              <span className="h-full">https://www.facebook.com/</span>
              <input
                {...register('facebook')}
                className="w-full rounded-xl p-3 shadow focus:ring-1 focus:ring-white"
                type="text"
                placeholder="Username"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-4 md:w-4/5">
            <label className="text-3xl">Youtube</label>
            <div className="flex items-center">
              <span className="h-full">https://www.youtube.com/</span>
              <input
                {...register('youtube')}
                className="w-full rounded-xl p-3 shadow focus:ring-1 focus:ring-white"
                type="text"
                placeholder="@Username"
              />
            </div>
          </div>

          <div className="flex space-x-4 md:w-4/5 lg:justify-end">
            <button className="smooth-effect w-fit rounded-xl border bg-stone-100 p-4 shadow dark:border-white dark:bg-dark-background dark:hover:bg-white/20">
              Xem hồ sơ công khai
            </button>
            <input
              className="w-fit cursor-pointer rounded-xl bg-white p-4 text-gray-600"
              type="submit"
              value={'Lưu thông tin'}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default memo(ProfileForms);
