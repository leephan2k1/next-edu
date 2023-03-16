import type { Discussion } from '@prisma/client';
import Image from 'next/image';
import { memo, useEffect, useState } from 'react';
import useDiscussion from '~/contexts/DiscussionContext';
import DiscussStandalone from './DiscussStandalone';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import { trpc } from '~/utils/trpc';
import toast from 'react-hot-toast';

interface CommentItemProps {
  originalDiscussionId: string;
  discussion: Discussion & {
    author: {
      id: string | null;
      name: string | null;
      image: string | null;
    };
    replies: (Discussion & {
      author: {
        id: string | null;
        name: string | null;
        image: string | null;
      };
    })[];
  };
}

function CommentItem({ discussion, originalDiscussionId }: CommentItemProps) {
  const { data: session } = useSession();
  const discussionCtx = useDiscussion();
  const [openEditor, setOpenEditor] = useState(false);
  const [openEditComment, setOpenEditComment] = useState(false);

  const { mutate: deleteDiscussion, status: deleteDiscussionStatus } =
    trpc.user.deleteDiscussion.useMutation();

  const handleDeleteDiscussion = () => {
    const confirm = window.confirm('Xác nhận xoá?');

    if (confirm) {
      deleteDiscussion({ discussionId: discussion.id });
    }
  };

  useEffect(() => {
    if (deleteDiscussionStatus === 'success') {
      discussionCtx?.refetch();
      toast.success('Xoá thảo luận thành công!');
      return;
    }

    if (deleteDiscussionStatus === 'error') {
      toast.error('Xoá thất bại, thử lại sau!');
    }
  }, [deleteDiscussionStatus]);

  return (
    <div className="flex w-full space-x-4 py-2 md:space-x-0">
      {!openEditComment ? (
        <div className="flex w-[15%] justify-center md:w-[10%]">
          <figure className="relative h-16 w-16 overflow-hidden rounded-full md:h-20 md:min-h-[5rem] md:w-20 md:min-w-[5rem]">
            <Image
              fill
              className="absolute rounded-full bg-cover bg-center bg-no-repeat"
              alt="user-avatar"
              src={discussion.author?.image || ''}
            />
          </figure>
        </div>
      ) : (
        <div className="flex h-fit flex-1 flex-col space-y-2">
          <DiscussStandalone
            discussionId={discussion.id}
            handleCancel={() => setOpenEditComment(false)}
            inputType="editDiscuss"
            prevContent={discussion.content}
            originalDiscussionId={originalDiscussionId}
            refetch={() => {
              setOpenEditComment(false);
              discussionCtx?.refetch();
            }}
          />
        </div>
      )}

      {!openEditComment && (
        <div className="flex h-fit flex-1 flex-col space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="font-bold">{discussion.author.name}</h1>

            {session && session?.user.id === discussion.author.id && (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleDeleteDiscussion()}
                  className="smooth-effect p-3 hover:text-rose-500"
                >
                  <TrashIcon className="h-6 w-6" />
                </button>
                <button
                  onClick={() => setOpenEditComment(true)}
                  className="smooth-effect p-3 hover:text-green-500"
                >
                  <PencilIcon className="h-6 w-6" />
                </button>
              </div>
            )}
          </div>

          <article
            className={`prose-lg prose min-h-fit min-w-full overflow-x-hidden rounded-xl bg-white p-4 text-gray-600 prose-img:rounded-2xl dark:bg-dark-background dark:text-white/80  lg:prose-xl`}
            dangerouslySetInnerHTML={{ __html: discussion.content }}
          ></article>

          <div className="flex space-x-4">
            <button
              onClick={() => setOpenEditor((prev) => !prev)}
              className="smooth-effect w-fit hover:text-yellow-500"
            >
              Trả lời
            </button>
            <span>·</span>
            <span className="select-none font-light italic text-gray-400 dark:text-white/50">
              {new Date(discussion.createdAt).toLocaleDateString('vi-VI')}
            </span>
          </div>

          {openEditor && (
            <DiscussStandalone
              inputType="reply"
              originalDiscussionId={originalDiscussionId}
              refetch={() => {
                setOpenEditor(false);
                discussionCtx?.refetch();
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default memo(CommentItem);
