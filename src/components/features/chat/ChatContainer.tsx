import { useRef, useState, useEffect, memo } from 'react';
import Editor from '../../shared/Editor';
import Loading from '~/components/buttons/Loading';
import { trpc } from '~/utils/trpc';
import useChat from '~/contexts/ChatContext';
import { If, Then, Else } from 'react-if';
import type QuillComponent from 'react-quill';
import axios from 'axios';
import type { Message } from '@prisma/client';
import { useSession } from 'next-auth/react';
import dateFormat from 'dateformat';
import useSocket from '~/contexts/SocketContext';

function ChatContainer() {
  const socketCtx = useSocket();
  const { data: userSession } = useSession();
  const chat = useChat();

  const editorRef = useRef<QuillComponent | null>(null);
  const bottomMessage = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<
    // trpc response type
    | (Message & {
        user: {
          id: string;
          name: string | null;
          image: string | null;
        };
      })[]
    | undefined
    | null
  >([]);

  const [submitStatus, setSubmitStatus] = useState<
    'loading' | 'error' | 'success' | 'default'
  >('default');

  trpc.chat.findSession.useQuery(
    {
      userIdOne: String(chat?.currentSession?.pOne),
      userIdTwo: String(chat?.currentSession?.pTwo),
    },
    {
      enabled: !!chat?.currentSession,
      onSuccess(data) {
        setMessages(data?.messages);
      },
    },
  );

  const handleSendMessage = async () => {
    setSubmitStatus('loading');
    const payload = {
      chatSessionId: chat?.currentSession?.id,
      content: editorRef.current?.value,
      createdAt: new Date(),
      user: {
        id: String(userSession?.user?.id),
        name: userSession?.user?.name,
        image: userSession?.user?.image,
      },
    };

    try {
      if (!editorRef.current?.value || !chat?.currentSession || !userSession)
        throw new Error();

      setMessages((msg) => [...msg, payload]);

      await axios.post(`/api/chat`, {
        chatSessionId: chat?.currentSession?.id,
        userIdOne:
          userSession?.user?.id === chat.currentSession.pOne
            ? chat.currentSession.pOne
            : chat.currentSession.pTwo,
        userIdTwo:
          userSession?.user?.id === chat.currentSession.pOne
            ? chat.currentSession.pTwo
            : chat.currentSession.pOne,
        content: editorRef.current?.value,
      });

      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');

      setMessages((msg) => msg?.filter((m) => m.user.id !== payload.user.id));
    }
  };

  // hook update real-time message:
  useEffect(() => {
    if (socketCtx?.connected) {
      socketCtx.socket.on('new-message', (data) => {
        // console.log('data ne: ', {
        //   data,
        //   userIdOne: data.userIdOne,
        //   userTwo: chat?.currentSession?.userTwo.id,
        //   currentSessionId: chat?.currentSession?.id,
        //   chatSessionId: data.chatSessionId,
        // });

        if (
          data &&
          data?.content &&
          data.userIdOne === chat?.currentSession?.userTwo.id &&
          chat?.currentSession?.id === data.chatSessionId
        ) {
          // console.log('set tin nhan');

          setMessages((msg) =>
            [
              ...msg,
              {
                content: data.content,
                createdAt: data.createdAt,
                user: chat?.currentSession?.userTwo,
              },
            ].filter(
              // filter remove duplicate -> idk how to socket duplicate emit multiple time?
              (value, idx, self) =>
                idx ===
                self.findIndex(
                  (t) => String(t.createdAt) === String(value.createdAt),
                ),
            ),
          );
        }
      });
    }

    return () => {
      socketCtx?.socket?.off('new-message');
    };
  }, [chat?.currentSession]);

  // hook scroll to end message:
  useEffect(() => {
    bottomMessage.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }, [messages]);

  return (
    <div className="mt-4 flex flex-1 flex-col justify-between px-4 md:mt-0">
      <If condition={status === 'loading'}>
        <Then>
          <div className="absolute-center my-10 max-h-[35rem] min-h-[35rem] w-full">
            <Loading />
          </div>
        </Then>

        <Else>
          <div className="mb-6 h-fit max-h-[35rem] min-h-[35rem] w-full space-y-4 overflow-x-hidden overflow-y-scroll rounded-2xl bg-white p-4 dark:bg-dark-background">
            {messages &&
              messages.length > 0 &&
              messages.map((message, idx) => {
                return (
                  <div
                    id={`message-${idx}`}
                    key={message.id}
                    className={`chat ${
                      userSession?.user.id === message?.user?.id
                        ? 'chat-end'
                        : 'chat-start'
                    }`}
                  >
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img src={message?.user?.image} />
                      </div>
                    </div>
                    <div className="chat-header text-gray-600 dark:text-white">
                      {message?.user?.name}
                      <time className="mx-4 text-xs opacity-50">
                        {dateFormat(
                          new Date(message?.createdAt),
                          'HH:mm dd/mm/yyyy',
                        )}
                      </time>
                    </div>

                    <div
                      className="prose-xl chat-bubble prose text-gray-600 dark:text-white"
                      dangerouslySetInnerHTML={{ __html: message?.content }}
                    ></div>
                  </div>
                );
              })}

            <div ref={bottomMessage}></div>
          </div>
        </Else>
      </If>

      <div className="w-full">
        <Editor
          isLoadingSubmit={submitStatus === 'loading'}
          styles="md:space-y-20"
          key={submitStatus}
          contents={''}
          onSubmit={handleSendMessage}
          getInstance={(editor) => {
            editorRef.current = editor;
          }}
        />
      </div>
    </div>
  );
}

export default memo(ChatContainer);
