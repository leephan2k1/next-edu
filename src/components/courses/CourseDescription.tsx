import { Disclosure, useDisclosureState } from 'ariakit/disclosure';
import { memo, useEffect, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface CourseDescriptionProps {
  description: string;
}

function CourseDescription({ description }: CourseDescriptionProps) {
  const disclosure = useDisclosureState();
  const [isOverflow, setIsOverflow] = useState(false);
  const [parent] = useAutoAnimate<HTMLParagraphElement>();

  useEffect(() => {
    parent.current && setIsOverflow(parent.current?.clientHeight > 200);
  }, [description]);

  return (
    <div className="smooth-effect mx-auto w-full lg:w-[70%]">
      <h1 className="my-4 text-2xl font-semibold md:text-3xl ">Mô tả</h1>

      <article
        ref={parent}
        className={`prose-xl prose ${
          disclosure.open && isOverflow ? 'h-fit' : 'h-[40rem]'
        } min-h-fit min-w-full overflow-hidden overflow-x-hidden text-gray-600 prose-img:max-w-[60vw] prose-img:rounded-2xl dark:text-white/80 lg:prose-2xl`}
        dangerouslySetInnerHTML={{ __html: description }}
      ></article>

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
    </div>
  );
}

export default memo(CourseDescription);
