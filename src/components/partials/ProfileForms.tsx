import Link from 'next/link';
import { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { trpc } from '~/utils/trpc';
import { PATHS } from '~/constants';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';

import Loading from '../buttons/Loading';
import Editor from '../shared/Editor';

import type { SubmitHandler } from 'react-hook-form';
import type QuillComponent from 'react-quill';
interface Inputs {
  linkedin: string;
  twitter: string;
  facebook: string;
  youtube: string;
  webUrl: string;
  specialist: string;
}

const validate = (instance: string, value: string): boolean => {
  switch (instance) {
    case 'editor':
      if (value.replace(/<\/?[^>]+(>|$)/g, '').length < 20) {
        return false;
      }

      return true;
    default:
      return false;
  }
};

function ProfileForms() {
  const [error, setError] = useState({
    bioError: false,
  });
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const [editor, setEditor] = useState<QuillComponent | null>(null);

  const { mutate: updateBio, status: updateBioStatus } =
    trpc.user.updateBio.useMutation();

  const { data: user, status: findBioStatus } = trpc.user.findBio.useQuery();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (
      (String(editor?.value).replace(/<\/?[^>]+(>|$)/g, '') &&
        !validate('editor', (editor?.value as string) || '')) ||
      editor?.value === ''
    ) {
      setError((error) => ({ ...error, bioError: true }));
      return;
    }

    const socialContacts = [];
    const { specialist, ...contacts } = data;

    Object.keys(contacts).map((key) => {
      if (contacts[key]) {
        socialContacts.push({ title: key, url: contacts[key] });
      }
    });

    updateBio({
      specialist: data.specialist,
      bioDescription: editor?.value as string,
      socialContacts,
    });
  };

  useEffect(() => {
    if (!user) return;

    reset({
      specialist: user?.bio?.specialist,
      ...Object.fromEntries(
        new Map(user.bio?.socialContacts.map((e) => [e.title, e.url])),
      ),
    });
  }, [user]);

  useEffect(() => {
    if (updateBioStatus === 'success') {
      toast.success('Cập nhật thông tin thành công!');
    }

    if (updateBioStatus === 'error') {
      toast.success('Có lỗi xảy ra! Thử lại sau!');
    }
  }, [updateBioStatus]);

  if (findBioStatus === 'loading') {
    return (
      <div className="absolute-center min-h-[60vh] w-full">
        <Loading />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid flex-1 grid-cols-1 py-6 lg:grid-cols-2 lg:gap-x-4"
    >
      <div className="flex flex-col space-y-10">
        <div className="flex flex-col space-y-4 md:w-3/4">
          <label className="text-3xl">Tóm tắt</label>
          {errors.specialist && (
            <span className="flex items-center text-xl italic text-rose-500">
              <ExclamationCircleIcon className="h-6 w-6" /> Tối đa 60 ký tự ký
              tự
            </span>
          )}

          <input
            {...register('specialist', { maxLength: 60, required: true })}
            onFocus={() => clearErrors('specialist')}
            className="rounded-xl p-3 shadow focus:ring-1 focus:ring-white"
            type="text"
            placeholder="3 năm kinh nghiệm trong giảng dạy Toán..."
          />
        </div>

        <div className="flex flex-col space-y-4 rounded-xl">
          <label className="text-3xl">Tiểu sử</label>
          {error.bioError && (
            <span className="flex items-center text-xl italic text-rose-500">
              <ExclamationCircleIcon className="h-6 w-6" /> Tiểu sử cần ít nhất
              20 ký tự
            </span>
          )}

          <Editor
            contents={user?.bio?.bioDescription || undefined}
            getInstance={(editor: QuillComponent) => {
              setEditor(editor);
            }}
            onEditorChange={() => {
              setError((error) => {
                if (error.bioError) {
                  return { ...errors, bioError: false };
                }
                return error;
              });
            }}
            styles="space-y-20 "
          />
        </div>
      </div>

      <div className="flex flex-col px-4">
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore  */}
        <div className="w-full space-y-10">
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
              <span className="h-full">https://www.linkedin.com/in/</span>
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
            <button
              onClick={(e) => {
                e.preventDefault();
              }}
              className="smooth-effect w-fit rounded-xl border bg-stone-100 p-4 shadow dark:border-white dark:bg-dark-background dark:hover:bg-white/20"
            >
              <Link href={`/${PATHS.USER}/${user?.id}`}>
                Xem hồ sơ công khai
              </Link>
            </button>

            {updateBioStatus === 'loading' ? (
              <div className="absolute-center min-h-[4.3rem] min-w-[11.3rem] rounded-xl bg-white text-gray-600 shadow-lg">
                <Loading />
              </div>
            ) : (
              <input
                className="w-fit cursor-pointer rounded-xl bg-white p-4 text-gray-600"
                type="submit"
                value={'Lưu thông tin'}
              />
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

export default memo(ProfileForms);
