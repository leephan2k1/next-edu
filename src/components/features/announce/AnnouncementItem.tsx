import { memo } from 'react';
import Image from 'next/image';

const ex = `<div class="ud-text-with-links" data-purpose="safely-set-inner-html:announcement:content"><p>Hi Space Cadets,</p><p>I have had numerous discussions with AWS on the T3 micro instances not being marked as free tier eligible. AWS is taking the issue seriously and is working on it. In the meantime the Intro to AWS lab notes have been updated to show the t3 instance. The cost is 1 cent per hour outside of the free tier.</p><p>If you are billed for t3 micro instance time that should be under the free tier, you can lodge a free billing support ticket with AWS. Despite the small cost, I would strongly recommend all students to do this in order to help elevate the issue.</p><p>In the meantime, AWS has released another version of the "new console experience" this week. Most notably you can't list services by "A-Z" to make them easy to find. The "new console experience" was released 3 years ago and has been changing virtually every week since.</p><p>Hopefully I can give you all better news with the next announcement.</p><p>All the best,</p><p>Paul</p><p>BackSpace Academy</p></div>`;

function AnnouncementItem() {
  return (
    <li className="flex flex-col">
      <div className="flex space-x-4">
        <figure className="relative h-16 w-16 overflow-hidden rounded-full md:h-20 md:min-h-[5rem] md:w-20 md:min-w-[5rem]">
          <Image
            fill
            className="absolute rounded-full bg-cover bg-center bg-no-repeat"
            alt="user-avatar"
            src="https://placeimg.com/192/192/people"
          />
        </figure>

        <div className="flex flex-1 flex-col justify-center space-y-2">
          <h2 className="font-medium md:text-3xl">Lorem ipsum dolor sit</h2>
          <div className="flex space-x-2 text-xl">
            <span>Đã đăng thông báo · </span>

            <span>1 tháng trước</span>
          </div>
        </div>
      </div>

      <article
        className={`prose-lg prose mt-4 min-h-fit min-w-full overflow-x-hidden rounded-xl bg-white p-4 text-gray-600 prose-img:rounded-2xl dark:bg-dark-background dark:text-white/80  lg:prose-xl`}
        dangerouslySetInnerHTML={{ __html: ex }}
      ></article>
    </li>
  );
}

export default memo(AnnouncementItem);
