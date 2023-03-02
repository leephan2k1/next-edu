import Image from 'next/image';
import { memo, useState } from 'react';
import DiscussStandalone from './DiscussStandalone';
const ex = `<p>todo</p><ul><li><p>test</p></li><li><p>dev</p></li><li><p>test</p></li><li><p>dev</p></li></ul>`;

function CommentItem() {
  const [openEditor, setOpenEditor] = useState(false);

  return (
    <div className="flex w-full space-x-4 py-2 md:space-x-0">
      <div className="flex w-[15%] justify-center md:w-[10%]">
        <figure className="relative h-16 w-16 overflow-hidden rounded-full md:h-20 md:min-h-[5rem] md:w-20 md:min-w-[5rem]">
          <Image
            fill
            className="absolute rounded-full bg-cover bg-center bg-no-repeat"
            alt="user-avatar"
            src="https://placeimg.com/192/192/people"
          />
        </figure>
      </div>

      <div className="flex h-fit flex-1 flex-col space-y-2">
        <h1 className="font-bold">Lorem ipsum dolor</h1>
        <article
          className={`prose-lg prose min-h-fit min-w-full overflow-x-hidden rounded-xl bg-white p-4 text-gray-600 prose-img:rounded-2xl dark:bg-dark-background dark:text-white/80  lg:prose-xl`}
          dangerouslySetInnerHTML={{ __html: ex }}
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
            1 tháng trước
          </span>
        </div>

        {openEditor && <DiscussStandalone inputType="comment" />}
      </div>
    </div>
  );
}

export default memo(CommentItem);
