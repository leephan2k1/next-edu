import Image from 'next/image';
import { memo, useEffect, useRef } from 'react';
import Editor from '~/components/shared/Editor';

import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import type QuillComponent from 'react-quill';
import useLecture from '~/contexts/LearningContext';
import { trpc } from '~/utils/trpc';

interface DiscussStandaloneProps {
  inputType: 'announcement' | 'discuss' | 'reply' | 'editDiscuss';
  customStatus?: string;
  prevContent?: string;
  discussionId?: string;
  originalDiscussionId?: string;
  authorId?: string | null;
  customSubmit?: (content: string) => void;
  refetch?: () => void;
  handleCancel?: () => void;
}

function DiscussStandalone({
  inputType,
  discussionId,
  prevContent,
  handleCancel,
  originalDiscussionId,
  customStatus,
  refetch,
  authorId,
  customSubmit,
}: DiscussStandaloneProps) {
  const editorRef = useRef<QuillComponent | null>(null);

  const { data: session } = useSession();
  const lectureCtx = useLecture();
  const router = useRouter();

  const {
    mutate: createAnnouncement,
    isSuccess: isCreateAnnouncementSuccess,
    isError: isCreateAnnouncementError,
    isLoading: isCreateAnnouncementLoading,
  } = trpc.course.createAnnouncement.useMutation();

  const { mutate: addDiscussion, status: addDiscussionStatus } =
    trpc.user.addDiscussion.useMutation();

  const { mutate: updateDiscussion, status: updateDiscussionStatus } =
    trpc.user.updateDiscussion.useMutation();

  const handleSubmitContent = async () => {
    try {
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
        return;
      }

      if (inputType === 'discuss') {
        const payload = {
          content: editorRef.current?.value as string,
          courseId: lectureCtx?.currentLecture?.id,
        };

        if (!payload.content || !lectureCtx?.currentLecture?.id) {
          toast.error('Oops! Có lỗi, thử lại sau!');
          return;
        }

        addDiscussion({
          content: payload.content,
          lectureId: lectureCtx?.currentLecture?.id,
        });
        await axios.post(`/api/notification`, {
          location: router.asPath,
          userId: lectureCtx?.course?.instructor.id,
          content: `Có học sinh thảo luận khoá học ${lectureCtx.course?.name} của bạn`,
        });
        return;
      }

      if (inputType === 'reply') {
        const payload = {
          content: editorRef.current?.value as string,
          courseId: lectureCtx?.currentLecture?.id,
          originalDiscussionId,
        };

        if (!payload.content || !lectureCtx?.currentLecture?.id) {
          toast.error('Oops! Có lỗi, thử lại sau!');
          return;
        }

        addDiscussion({
          content: payload.content,
          lectureId: lectureCtx?.currentLecture?.id,
          replyId: payload.originalDiscussionId,
        });
        await axios.post(`/api/notification`, {
          location: router.asPath,
          userId: authorId,
          content: `Có người trả lời thảo luận khoá học ${lectureCtx.course?.name} của bạn`,
        });
        return;
      }

      if (inputType === 'editDiscuss' && discussionId) {
        const payload = {
          content: editorRef.current?.value as string,
          id: discussionId,
        };

        if (
          prevContent === editorRef.current?.value &&
          refetch &&
          typeof refetch === 'function'
        ) {
          refetch();
          return;
        }

        updateDiscussion({ content: payload.content, id: payload.id });

        return;
      }
    } catch (error) {
      toast.error('Oops! Có lỗi, thử lại sau!');
    }
  };

  useEffect(() => {
    if (
      updateDiscussionStatus === 'success' &&
      refetch &&
      typeof refetch === 'function'
    ) {
      refetch();
    }

    if (updateDiscussionStatus === 'error') {
      toast.error('Oops! Có lỗi, thử lại sau!');
    }
  }, [updateDiscussionStatus]);

  useEffect(() => {
    if (
      addDiscussionStatus === 'success' &&
      refetch &&
      typeof refetch === 'function'
    ) {
      refetch();
    }

    if (addDiscussionStatus === 'error') {
      toast.error('Oops! Có lỗi, thử lại sau!');
    }
  }, [addDiscussionStatus]);

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
      <div className="flex w-[15%] sm:w-[10%] md:w-[8%]">
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
        handleCancel={() => {
          if (handleCancel && typeof handleCancel === 'function') {
            handleCancel();
          }
        }}
        removeMessage={inputType === 'editDiscuss' ? 'Huỷ' : undefined}
        key={String(
          isCreateAnnouncementSuccess || customStatus || addDiscussionStatus,
        )}
        contents={
          isCreateAnnouncementSuccess ||
          customStatus === 'success' ||
          addDiscussionStatus === 'success'
            ? ''
            : prevContent !== undefined
            ? prevContent
            : undefined
        }
        isLoadingSubmit={
          isCreateAnnouncementLoading ||
          customStatus === 'loading' ||
          addDiscussionStatus === 'loading' ||
          updateDiscussionStatus === 'loading'
        }
        getInstance={(editor) => {
          editorRef.current = editor;
        }}
        onSubmit={() => {
          if (customSubmit && typeof customSubmit === 'function') {
            customSubmit(editorRef.current?.value as string);
            return;
          }

          handleSubmitContent();
        }}
      />
    </div>
  );
}

export default memo(DiscussStandalone);
