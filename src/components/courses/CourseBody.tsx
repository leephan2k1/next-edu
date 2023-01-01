import CourseAchievement from './CourseAchievement';
import CourseContent from './CourseContent';
import CourseRequirements from './CourseRequirements';
import CourseDescription from './CourseDescription';

export default function CourseBody() {
  return (
    <div className="my-16 min-h-[1000px] w-full text-gray-600 dark:text-white/80">
      <div className="mx-auto flex w-full flex-col space-y-14 px-4 md:max-w-[720px] lg:max-w-[1200px]">
        <CourseAchievement />

        <CourseContent />

        <CourseRequirements />

        <CourseDescription />
      </div>
    </div>
  );
}
