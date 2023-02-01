import { memo } from 'react';
import Image from 'next/image';
import Editor from '../shared/Editor';

function Messages() {
  return (
    <div className="flex w-full flex-col p-6 md:flex-row">
      <ul className="flex max-h-[50rem] w-full flex-nowrap space-x-4  overflow-y-auto overflow-x-scroll py-2 md:w-[30%] md:flex-col md:space-y-4 md:space-x-0 md:overflow-x-hidden md:px-3 md:py-0">
        <li className="flex min-w-[20rem] items-center space-x-4 rounded-xl bg-white px-4 py-3 dark:bg-dark-background md:min-w-full">
          <figure className="min-w-16 min-h-16 relative h-16 w-16 overflow-hidden rounded-full">
            <Image
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              fill
              alt="user-avatar"
              src={'https://placeimg.com/192/192/people'}
            />
          </figure>
          <h2 className="text-xl font-bold">User name</h2>
        </li>

        <li className="flex min-w-[20rem] items-center space-x-4 rounded-xl bg-white px-4 py-3 dark:bg-dark-background md:min-w-full">
          <figure className="min-w-16 min-h-16 relative h-16 w-16 overflow-hidden rounded-full">
            <Image
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              fill
              alt="user-avatar"
              src={'https://placeimg.com/192/192/people'}
            />
          </figure>
          <h2 className="text-xl font-bold">User name</h2>
        </li>

        <li className="flex min-w-[20rem] items-center space-x-4 rounded-xl bg-white px-4 py-3 dark:bg-dark-background md:min-w-full">
          <figure className="min-w-16 min-h-16 relative h-16 w-16 overflow-hidden rounded-full">
            <Image
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              fill
              alt="user-avatar"
              src={'https://placeimg.com/192/192/people'}
            />
          </figure>
          <h2 className="text-xl font-bold">User name</h2>
        </li>
        <li className="flex min-w-[20rem] items-center space-x-4 rounded-xl bg-white px-4 py-3 dark:bg-dark-background md:min-w-full">
          <figure className="min-w-16 min-h-16 relative h-16 w-16 overflow-hidden rounded-full">
            <Image
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              fill
              alt="user-avatar"
              src={'https://placeimg.com/192/192/people'}
            />
          </figure>
          <h2 className="text-xl font-bold">User name</h2>
        </li>
        <li className="flex min-w-[20rem] items-center space-x-4 rounded-xl bg-white px-4 py-3 dark:bg-dark-background md:min-w-full">
          <figure className="min-w-16 min-h-16 relative h-16 w-16 overflow-hidden rounded-full">
            <Image
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              fill
              alt="user-avatar"
              src={'https://placeimg.com/192/192/people'}
            />
          </figure>
          <h2 className="text-xl font-bold">User name</h2>
        </li>
        <li className="flex min-w-[20rem] items-center space-x-4 rounded-xl bg-white px-4 py-3 dark:bg-dark-background md:min-w-full">
          <figure className="min-w-16 min-h-16 relative h-16 w-16 overflow-hidden rounded-full">
            <Image
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              fill
              alt="user-avatar"
              src={'https://placeimg.com/192/192/people'}
            />
          </figure>
          <h2 className="text-xl font-bold">User name</h2>
        </li>
        <li className="flex min-w-[20rem] items-center space-x-4 rounded-xl bg-white px-4 py-3 dark:bg-dark-background md:min-w-full">
          <figure className="min-w-16 min-h-16 relative h-16 w-16 overflow-hidden rounded-full">
            <Image
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              fill
              alt="user-avatar"
              src={'https://placeimg.com/192/192/people'}
            />
          </figure>
          <h2 className="text-xl font-bold">User name</h2>
        </li>
        <li className="flex min-w-[20rem] items-center space-x-4 rounded-xl bg-white px-4 py-3 dark:bg-dark-background md:min-w-full">
          <figure className="min-w-16 min-h-16 relative h-16 w-16 overflow-hidden rounded-full">
            <Image
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              fill
              alt="user-avatar"
              src={'https://placeimg.com/192/192/people'}
            />
          </figure>
          <h2 className="text-xl font-bold">User name</h2>
        </li>
        <li className="flex min-w-[20rem] items-center space-x-4 rounded-xl bg-white px-4 py-3 dark:bg-dark-background md:min-w-full">
          <figure className="min-w-16 min-h-16 relative h-16 w-16 overflow-hidden rounded-full">
            <Image
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              fill
              alt="user-avatar"
              src={'https://placeimg.com/192/192/people'}
            />
          </figure>
          <h2 className="text-xl font-bold">User name</h2>
        </li>
        <li className="flex min-w-[20rem] items-center space-x-4 rounded-xl bg-white px-4 py-3 dark:bg-dark-background md:min-w-full">
          <figure className="min-w-16 min-h-16 relative h-16 w-16 overflow-hidden rounded-full">
            <Image
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              fill
              alt="user-avatar"
              src={'https://placeimg.com/192/192/people'}
            />
          </figure>
          <h2 className="text-xl font-bold">User name</h2>
        </li>
      </ul>
      <div className="mt-4 flex flex-1 flex-col justify-between px-4 md:mt-0">
        <div className="my-10 h-fit w-full">
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="https://placeimg.com/192/192/people" />
              </div>
            </div>
            <div className="chat-header text-gray-600 dark:text-white">
              Obi-Wan Kenobi
              <time className="mx-4 text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble text-gray-600 dark:text-white">
              You were the Chosen One!
            </div>
          </div>
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="https://placeimg.com/192/192/people" />
              </div>
            </div>
            <div className="chat-header text-gray-600 dark:text-white">
              Anakin
              <time className="mx-4 text-xs opacity-50">12:46</time>
            </div>
            <div className="chat-bubble text-gray-600 dark:text-white">
              I hate you!
            </div>
          </div>
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="https://placeimg.com/192/192/people" />
              </div>
            </div>
            <div className="chat-header text-gray-600 dark:text-white">
              Obi-Wan Kenobi
              <time className="mx-4 text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble text-gray-600 dark:text-white">
              You were the Chosen One!
            </div>
          </div>
        </div>

        <div className="w-full">
          <Editor
            styles="md:space-y-20"
            onSubmit={() => {
              console.warn('submit');
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(Messages);
