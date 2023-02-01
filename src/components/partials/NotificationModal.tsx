import { Dialog, Transition } from '@headlessui/react';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { Fragment } from 'react';
import { notificationModalState } from '~/atoms/notificationModalState';

const ex = `<div class="ud-text-with-links" data-purpose="safely-set-inner-html:announcement:content"><p>Hi Space Cadets,</p><p>I have had numerous discussions with AWS on the T3 micro instances not being marked as free tier eligible. AWS is taking the issue seriously and is working on it. In the meantime the Intro to AWS lab notes have been updated to show the t3 instance. The cost is 1 cent per hour outside of the free tier.</p><p>If you are billed for t3 micro instance time that should be under the free tier, you can lodge a free billing support ticket with AWS. Despite the small cost, I would strongly recommend all students to do this in order to help elevate the issue.</p><p>In the meantime, AWS has released another version of the "new console experience" this week. Most notably you can't list services by "A-Z" to make them easy to find. The "new console experience" was released 3 years ago and has been changing virtually every week since.</p><p>Hopefully I can give you all better news with the next announcement.</p><p>All the best,</p><p>Paul</p><p>BackSpace Academy</p></div>`;

export default function NotificationModal() {
  const [isOpen, setIsOpen] = useAtom(notificationModalState);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[500]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0  bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto text-gray-600 dark:text-white">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="h-[70vh] w-[90vw] transform overflow-y-scroll rounded-2xl bg-white p-6 px-4 text-left align-middle transition-all dark:bg-zinc-800 md:w-[60rem]">
                  <Dialog.Title
                    as="div"
                    className="flex items-center space-x-4"
                  >
                    <figure className="relative h-16 w-16 overflow-hidden rounded-full md:h-20 md:min-h-[5rem] md:w-20 md:min-w-[5rem]">
                      <Image
                        fill
                        className="absolute rounded-full bg-cover bg-center bg-no-repeat"
                        alt="user-avatar"
                        src="https://placeimg.com/192/192/people"
                      />
                    </figure>

                    <div className="flex flex-1 flex-col justify-center space-y-2">
                      <h2 className="font-medium md:text-3xl">
                        Lorem ipsum dolor sit
                      </h2>
                      <div className="flex space-x-2 text-xl">
                        <span>Đã đăng thông báo · </span>

                        <span>1 tháng trước</span>
                      </div>
                    </div>
                  </Dialog.Title>

                  <article
                    className={`prose-lg prose mt-4 min-h-fit min-w-full overflow-x-hidden rounded-xl bg-white p-4 text-gray-600 prose-img:rounded-2xl dark:bg-dark-background dark:text-white/80  lg:prose-xl`}
                    dangerouslySetInnerHTML={{ __html: ex }}
                  ></article>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
