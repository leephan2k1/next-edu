import Image from 'next/image';
import { memo, useEffect, useRef } from 'react';
import Editor from '~/components/shared/Editor';

import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import type QuillComponent from 'react-quill';
import useLecture from '~/contexts/LearningContext';
import { trpc } from '~/utils/trpc';

interface DiscussStandaloneProps {
  inputType: 'announcement' | 'discuss' | 'comment';
  refetch?: () => void;
}

function DiscussStandalone({ inputType, refetch }: DiscussStandaloneProps) {
  const editorRef = useRef<QuillComponent | null>(null);

  const { data: session } = useSession();
  const lectureCtx = useLecture();

  const {
    mutate: createAnnouncement,
    isSuccess: isCreateAnnouncementSuccess,
    isError: isCreateAnnouncementError,
    isLoading: isCreateAnnouncementLoading,
  } = trpc.course.createAnnouncement.useMutation();

  const handleSubmitContent = () => {
    if (inputType === 'announcement') {
      const payload = {
        content: editorRef.current?.value as string,
        courseId: (lectureCtx?.course && lectureCtx?.course.id) || '',
      };

      if (!payload.content || !payload.courseId) {
        toast.error('Oops! Có lỗi, thử lại sau!');
        return;
      }

      createAnnouncement({ content: payload.content, id: payload.courseId });
    }
  };

  useEffect(() => {
    if (isCreateAnnouncementSuccess && inputType === 'announcement') {
      toast.success('Tạo thông báo thành công!');
      if (refetch && typeof refetch === 'function') {
        refetch();
      }
    }

    if (isCreateAnnouncementError) {
      toast.error('Oops! Có lỗi, thử lại sau!');
    }
  }, [isCreateAnnouncementSuccess, isCreateAnnouncementError]);

  return (
    <div className="flex">
      <div className="flex w-[20%] md:w-[8%]">
        <figure className="relative h-20 w-20 overflow-hidden rounded-full">
          <Image
            fill
            className="absolute rounded-full bg-cover bg-center bg-no-repeat"
            alt="user-avatar"
            src={session?.user?.image || ''}
          />
        </figure>
      </div>

      <Editor
        key={String(isCreateAnnouncementSuccess)}
        contents={isCreateAnnouncementSuccess ? '' : undefined}
        isLoadingSubmit={isCreateAnnouncementLoading}
        getInstance={(editor) => {
          editorRef.current = editor;
        }}
        onSubmit={() => {
          handleSubmitContent();
        }}
      />
    </div>
  );
}

export default memo(DiscussStandalone);
