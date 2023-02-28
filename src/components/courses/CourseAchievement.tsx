import { CheckIcon } from '@heroicons/react/24/outline';

interface CourseAchievementProps {
  targets: { id: string; content: string }[];
}

export default function CourseAchievement({ targets }: CourseAchievementProps) {
  return (
    <section className="mx-auto flex w-full flex-col space-y-4 lg:w-[70%]">
      <h1 className="text-2xl font-semibold md:text-3xl">
        Bạn sẽ được học gì?
      </h1>
      <ul className="grid grid-cols-1 gap-4 gap-y-4 md:grid-cols-2">
        {targets.length > 0 &&
          targets.map((target) => {
            return (
              <li key={target.id} className="flex space-x-2">
                <span className="mt-1 h-fit w-fit rounded-full bg-blue-200 p-2">
                  <CheckIcon className="h-4 w-4 font-bold text-blue-700" />
                </span>
                <p>{target.content}</p>
              </li>
            );
          })}
      </ul>
    </section>
  );
}
