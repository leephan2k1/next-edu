import { CheckIcon } from '@heroicons/react/24/outline';

export default function CourseAchievement() {
  return (
    <section className="mx-auto flex w-full flex-col space-y-4 lg:w-[70%]">
      <h1 className="text-2xl font-semibold md:text-3xl">
        Bạn sẽ được học gì?
      </h1>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <li className="flex space-x-2">
          <span className="mt-1 h-fit w-fit rounded-full bg-blue-200 p-2">
            <CheckIcon className="h-4 w-4 font-bold text-blue-700" />
          </span>
          <p>
            {' '}
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti
            eveniet impedit quaerat, quod et incidunt minima, voluptate
            architecto perspiciatis, quia nihil! Quisquam nihil officiis
            dignissimos eaque accusamus, culpa dolore veritatis
          </p>
        </li>
        <li className="flex space-x-2">
          <span className="mt-1 h-fit w-fit rounded-full bg-blue-200 p-2">
            <CheckIcon className="h-4 w-4 text-blue-700" />
          </span>
          <p>
            {' '}
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti
            eveniet impedit quaerat, quod et incidunt minima, voluptate
            architecto perspiciatis, quia nihil! Quisquam nihil officiis
            dignissimos eaque accusamus, culpa dolore veritatis
          </p>
        </li>
        <li className="flex space-x-2">
          <span className="mt-1 h-fit w-fit rounded-full bg-blue-200 p-2">
            <CheckIcon className="h-4 w-4 text-blue-700" />
          </span>
          <p>
            {' '}
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti
            eveniet impedit quaerat, quod et incidunt minima, voluptate
            architecto perspiciatis, quia nihil! Quisquam nihil officiis
            dignissimos eaque accusamus, culpa dolore veritatis
          </p>
        </li>
        <li className="flex space-x-2">
          <span className="mt-1 h-fit w-fit rounded-full bg-blue-200 p-2">
            <CheckIcon className="h-4 w-4 text-blue-700" />
          </span>
          <p>
            {' '}
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti
            eveniet impedit quaerat, quod et incidunt minima, voluptate
            architecto perspiciatis, quia nihil! Quisquam nihil officiis
            dignissimos eaque accusamus, culpa dolore veritatis
          </p>
        </li>
      </ul>
    </section>
  );
}
