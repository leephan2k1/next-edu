import { PencilIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/solid';
import type { Announcement } from '@prisma/client';
import Image from 'next/image';
import { memo, useEffect, useState, useRef } from 'react';
import { trpc } from '~/utils/trpc';
import Editor from '~/components/shared/Editor';
import type QuillComponent from 'react-quill';
import toast from 'react-hot-toast';

interface AnnouncementItemProps {
  announcement: Announcement;
  isOwner: boolean;
  instructor: { name: string; image: string };
  refetch?: () => void;
}

function AnnouncementItem({
  announcement,
  instructor,
  isOwner,
  refetch,
}: AnnouncementItemProps) {
  const [openEditor, setOpenEditor] = useState(false);

  const editorRef = useRef<QuillComponent | null>(null);

  const {
    mutate: deleteAnnouncement,
    isSuccess: isDeleteAnnouncementSuccess,
    isError: isDeleteAnnouncementError,
  } = trpc.course.deleteAnnouncement.useMutation();

  const {
    mutate: updateAnnouncement,
    isError: isUpdateAnnouncementError,
    isSuccess: isUpdateAnnouncementSuccess,
    isLoading: isUpdateAnnouncementLoading,
  } = trpc.course.updateAnnouncement.useMutation();

  useEffect(() => {
    if (
      (isDeleteAnnouncementSuccess || isUpdateAnnouncementSuccess) &&
      refetch &&
      typeof refetch === 'function'
    ) {
      refetch();
      setOpenEditor(false);
    }

    if (isUpdateAnnouncementError || isDeleteAnnouncementError) {
      toast.error('Oopps! Lỗi xảy ra, thử lại sau!');
    }
  }, [
    isDeleteAnnouncementSuccess,
    isUpdateAnnouncementSuccess,
    isUpdateAnnouncementError,
    isDeleteAnnouncementError,
  ]);

  const handleDeleteAnnouncement = () => {
    const isConfirm = window.confirm('Đồng ý xoá thông báo?');

    if (isConfirm) {
      deleteAnnouncement({ id: announcement.id });
    }
  };

  const handleUpdateAnnouncement = () => {
    const payload = {
      id: announcement.id,
      content: editorRef.current?.value as string,
    };

    if (payload.content === announcement.content) {
      setOpenEditor(false);
    } else {
      updateAnnouncement(payload);
    }
  };

  return (
    <li className="flex flex-col">
      <div className="flex space-x-4">
        <figure className="relative h-16 w-16 overflow-hidden rounded-full md:h-20 md:min-h-[5rem] md:w-20 md:min-w-[5rem]">
          <Image
            fill
            className="absolute rounded-full bg-cover bg-center bg-no-repeat"
            alt="user-avatar"
            src={instructor.image}
          />
        </figure>

        <div className="flex flex-1 justify-between">
          <div className="flex flex-col space-y-2">
            <h2 className="font-medium md:text-3xl">{instructor.name}</h2>
            <div className="flex space-x-2 text-xl">
              <span>Đã đăng thông báo · </span>

              <span>
                {new Date(announcement.createdAt).toLocaleDateString('vi-VI')}
              </span>
            </div>
          </div>

          {isOwner && (
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setOpenEditor(true);
                }}
                className="smooth-effect p-2 hover:text-green-500"
              >
                <PencilIcon className="h-6 w-6" />
              </button>
              <button
                onClick={handleDeleteAnnouncement}
                className="smooth-effect p-2 hover:text-rose-500"
              >
                <TrashIcon className="h-6 w-6" />
              </button>
            </div>
          )}
        </div>
      </div>

      {openEditor ? (
        <Editor
          getInstance={(editor) => {
            editorRef.current = editor;
          }}
          isLoadingSubmit={isUpdateAnnouncementLoading}
          contents={announcement.content}
          styles="mt-6"
          removeMessage="Huỷ"
          handleCancel={() => setOpenEditor(false)}
          onSubmit={() => {
            handleUpdateAnnouncement();
          }}
        />
      ) : (
        <article
          className={`prose-lg prose mt-4 min-h-fit min-w-full overflow-x-hidden rounded-xl bg-white p-4 text-gray-600 prose-img:rounded-2xl dark:bg-dark-background dark:text-white/80  lg:prose-xl`}
          dangerouslySetInnerHTML={{ __html: announcement.content }}
        ></article>
      )}
    </li>
  );
}

export default memo(AnnouncementItem);
