const description = `<div data-purpose="description-content"><p>Aleksa is a Penetration Tester with over 5 years of experience in <strong>Ethical Hacking and Cyber Security</strong>. As a self made hacker that started from a young age he has learned it all from Ethical Hacking and Cyber Security to Online Privacy and How To Become Anonymous Online.<br></p><p><br></p><p>He has worked and discovered vulnerabilities for multiple companies and governments. He also worked as a freelancer that tested private web applications. He believes that Online Security and Privacy is something valuable but also that it doesn't get enough attention as many cyber attacks are being executed every single day! <strong><em>No System is Safe </em></strong>and that is why we are here to discover vulnerabilities and secure them before the bad guys attempt anything malicious.<br></p><p><br></p><p>His main goal as an instructor is to teach the foundations of Ethical Hacking and Cyber Security to anyone who wants to pursue this as a career or wants to learn it to protect themselves online. Cyber attacks and online security is something that changes really fast so we as hackers must always be ready to learn new things in order to better protect Networks, Websites, Machines .. and also people!</p></div>`;

import { Disclosure, useDisclosureState } from 'ariakit/disclosure';
import Image from 'next/image';
import { memo, useEffect, useState } from 'react';
import { GiAchievement } from 'react-icons/gi';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { BookOpenIcon, StarIcon, UsersIcon } from '@heroicons/react/24/solid';

function Instructor() {
  const disclosure = useDisclosureState();
  const [isOverflow, setIsOverflow] = useState(false);
  const [parent] = useAutoAnimate<HTMLParagraphElement>();

  useEffect(() => {
    parent.current && setIsOverflow(parent.current?.clientHeight > 50);
  }, [description]);

  return (
    <div className="flex w-full flex-col space-y-4">
      <h1 className="max-w-[70%] text-2xl text-yellow-500 line-clamp-1 md:max-w-[50%] md:text-3xl">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati,
        corrupti. Quibusdam illo optio earum ipsum consequuntur labore nisi
        quisquam? Expedita quae vero illum reiciendis architecto pariatur
        similique ad tempore tenetur!
      </h1>

      <div className="mt-4 flex space-x-4">
        <figure className="relative h-[7rem] w-[7rem] overflow-hidden rounded-full md:h-[10rem] md:w-[10rem]">
          <Image
            src={'https://placeimg.com/192/192/people'}
            fill
            alt="user-avatar"
            className="absolute inset-0 bg-center bg-no-repeat"
          />
        </figure>

        <div className="flex flex-col space-y-2 text-xl md:text-2xl">
          <div className="flex items-center space-x-4">
            <StarIcon className="h-6 w-6" />
            <span>5.0 xếp hạng</span>
          </div>
          <div className="flex items-center space-x-4">
            <GiAchievement className="h-6 w-6" />
            <span>600 đánh giá</span>
          </div>
          <div className="flex items-center space-x-4">
            <UsersIcon className="h-6 w-6" />
            <span>721 học viên</span>
          </div>
          <div className="flex items-center space-x-4">
            <BookOpenIcon className="h-6 w-6" />
            <span>10 khoá học</span>
          </div>
        </div>
      </div>

      <article
        ref={parent}
        className={`prose-xl prose ${
          disclosure.open && isOverflow ? 'h-fit' : 'h-[10rem]'
        } min-h-fit min-w-full overflow-hidden overflow-x-hidden text-gray-600 prose-img:max-w-[60vw] prose-img:rounded-2xl dark:text-white/80 lg:prose-2xl`}
        dangerouslySetInnerHTML={{ __html: description }}
      ></article>

      <>
        {isOverflow && (
          <Disclosure
            className="absolute-center flex w-full flex-col"
            state={disclosure}
          >
            <span>{disclosure.open ? 'Thu gọn' : 'Xem thêm'}</span>
            <ChevronDownIcon
              className={`smooth-effect h-6 w-6 ${
                disclosure.open ? 'rotate-180 transform' : ''
              }`}
            />
          </Disclosure>
        )}
      </>
    </div>
  );
}
export default memo(Instructor);
