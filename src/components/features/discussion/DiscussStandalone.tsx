import { memo } from 'react';
import Image from 'next/image';
import Editor from '~/components/shared/Editor';

function DiscussStandalone() {
  return (
    <div className="flex">
      <div className="flex w-[20%] md:w-[8%]">
        <figure className="relative h-20 w-20 overflow-hidden rounded-full">
          <Image
            fill
            className="absolute rounded-full bg-cover bg-center bg-no-repeat"
            alt="user-avatar"
            src="https://placeimg.com/192/192/people"
          />
        </figure>
      </div>

      <Editor />
    </div>
  );
}

export default memo(DiscussStandalone);
