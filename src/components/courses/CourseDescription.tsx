import { memo } from 'react';

interface CourseDescriptionProps {
  description: string;
}

function CourseDescription({ description }: CourseDescriptionProps) {
  return (
    <div className="smooth-effect mx-auto w-full lg:w-[70%]">
      <h1 className="my-4 text-2xl font-semibold md:text-3xl ">Mô tả</h1>

      <article
        className={`prose-xl prose h-fit min-h-fit min-w-full overflow-hidden overflow-x-hidden text-gray-600 lg:prose-2xl prose-img:max-w-[60vw] prose-img:rounded-2xl dark:text-white/80`}
        dangerouslySetInnerHTML={{ __html: description }}
      ></article>
    </div>
  );
}

export default memo(CourseDescription);
