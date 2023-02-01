const ex = `<div class="ud-text-with-links" data-purpose="safely-set-inner-html:announcement:content"><p>Hi Space Cadets,</p><p>I have had numerous discussions with AWS on the T3 micro instances not being marked as free tier eligible. AWS is taking the issue seriously and is working on it. In the meantime the Intro to AWS lab notes have been updated to show the t3 instance. The cost is 1 cent per hour outside of the free tier.</p><p>If you are billed for t3 micro instance time that should be under the free tier, you can lodge a free billing support ticket with AWS. Despite the small cost, I would strongly recommend all students to do this in order to help elevate the issue.</p><p>In the meantime, AWS has released another version of the "new console experience" this week. Most notably you can't list services by "A-Z" to make them easy to find. The "new console experience" was released 3 years ago and has been changing virtually every week since.</p><p>Hopefully I can give you all better news with the next announcement.</p><p>All the best,</p><p>Paul</p><p>BackSpace Academy</p></div>`;

import { TrashIcon as TrashIconSolid } from '@heroicons/react/24/solid';
import NotificationModal from './NotificationModal';
import { useSetAtom } from 'jotai';
import { notificationModalState } from '~/atoms/notificationModalState';

export default function Notifications() {
  const setModalOpen = useSetAtom(notificationModalState);

  return (
    <section className="flex w-full flex-col">
      <NotificationModal />

      <button className="w-fit rounded-xl bg-rose-400 p-3 text-white">
        Xoá tất cả
      </button>

      <ul className="mx-auto mt-6 w-full space-y-4 md:w-4/5">
        <li
          onClick={() => setModalOpen(true)}
          className="flex cursor-pointer items-center justify-between space-x-4 rounded-xl bg-white py-4 px-6 shadow dark:bg-dark-background"
        >
          <h1 className="whitespace-nowrap text-xl font-bold">User Name</h1>

          <p className="text-xl line-clamp-1">
            {ex.replace(/<\/?[^>]+(>|$)/g, '')}
          </p>

          <button className="p-2">
            <TrashIconSolid className="smooth-effect h-6 w-6 text-rose-500 hover:text-rose-700" />
          </button>
        </li>
        <li
          onClick={() => setModalOpen(true)}
          className="flex cursor-pointer items-center justify-between space-x-4 rounded-xl bg-white py-4 px-6 shadow dark:bg-dark-background"
        >
          <h1 className="whitespace-nowrap text-xl font-bold">User Name</h1>

          <p className="text-xl line-clamp-1">
            {ex.replace(/<\/?[^>]+(>|$)/g, '')}
          </p>

          <button className="p-2">
            <TrashIconSolid className="smooth-effect h-6 w-6 text-rose-500 hover:text-rose-700" />
          </button>
        </li>
        <li
          onClick={() => setModalOpen(true)}
          className="flex cursor-pointer items-center justify-between space-x-4 rounded-xl bg-white py-4 px-6 shadow dark:bg-dark-background"
        >
          <h1 className="whitespace-nowrap text-xl font-bold">User Name</h1>

          <p className="text-xl line-clamp-1">
            {ex.replace(/<\/?[^>]+(>|$)/g, '')}
          </p>

          <button className="p-2">
            <TrashIconSolid className="smooth-effect h-6 w-6 text-rose-500 hover:text-rose-700" />
          </button>
        </li>
        <li
          onClick={() => setModalOpen(true)}
          className="flex cursor-pointer items-center justify-between space-x-4 rounded-xl bg-white py-4 px-6 shadow dark:bg-dark-background"
        >
          <h1 className="whitespace-nowrap text-xl font-bold">User Name</h1>

          <p className="text-xl line-clamp-1">
            {ex.replace(/<\/?[^>]+(>|$)/g, '')}
          </p>

          <button className="p-2">
            <TrashIconSolid className="smooth-effect h-6 w-6 text-rose-500 hover:text-rose-700" />
          </button>
        </li>
      </ul>
    </section>
  );
}
