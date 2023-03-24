import Image from 'next/image';
import useChat from '~/contexts/ChatContext';

export default function ChatSessions() {
  const chat = useChat();

  const handleNavigateSession = (userTwoId: string) => {
    if (chat?.sessionsData) {
      const selectedSession = chat?.sessionsData.find(
        (e) => e.pTwo === userTwoId,
      );

      chat.setCurrentSession({
        id: selectedSession?.id,
        pOne: selectedSession?.pOne,
        pTwo: selectedSession?.pTwo,
        userTwo: selectedSession.users.find((u) => u.id === userTwoId),
      });
    }
  };

  return (
    <ul className="flex max-h-[50rem] w-full flex-nowrap space-x-4 overflow-y-auto overflow-x-scroll py-2 md:w-[30%] md:min-w-[30%] md:flex-col md:space-y-4 md:space-x-0 md:overflow-x-hidden md:px-3 md:py-0">
      {chat?.chatSessions &&
        chat?.chatSessions.length > 0 &&
        chat?.chatSessions.map((s) => {
          return (
            <li
              onClick={() => handleNavigateSession(s.id)}
              key={s.id}
              className={`flex min-w-[20rem] cursor-pointer items-center space-x-4 rounded-xl ${
                chat?.currentSession?.userTwo.id === s.id
                  ? 'bg-yellow-400 text-black'
                  : 'bg-white dark:bg-dark-background'
              } px-4 py-3 md:min-w-full`}
            >
              <figure className="relative h-16 min-h-[4rem] w-16 min-w-[4rem] overflow-hidden rounded-full">
                <Image
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  fill
                  alt="user-avatar"
                  src={s.image || ''}
                />
              </figure>
              <h2 className="text-xl font-bold">{s.name}</h2>
            </li>
          );
        })}
    </ul>
  );
}
