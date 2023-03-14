import { MdPeopleOutline } from 'react-icons/md';
import { SiGoogleclassroom } from 'react-icons/si';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { CountUp } from 'use-count-up';

interface AchievementProps {
  totalCourses: number;
  totalStudents: number;
  totalInstructors: number;
}

export default function Achievement({
  totalCourses,
  totalInstructors,
  totalStudents,
}: AchievementProps) {
  return (
    <div className="mt-4 flex w-full justify-evenly bg-white px-4 py-10 dark:bg-dark-background">
      <div className="flex items-center space-x-4">
        <span className="absolute-center h-14 w-14 rounded-full bg-indigo-500">
          <SiGoogleclassroom className="text-white" />
        </span>
        <span>
          <CountUp isCounting end={totalCourses} duration={1.5} /> khoá học
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <span className="absolute-center h-14 w-14 rounded-full bg-sky-500">
          <MdPeopleOutline className="text-white" />
        </span>
        <span>
          <CountUp isCounting end={totalStudents} duration={1.5} /> học sinh
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <span className="absolute-center h-14 w-14 rounded-full bg-orange-500">
          <FaChalkboardTeacher className="text-white" />
        </span>
        <span>
          <CountUp isCounting end={totalInstructors} duration={1.5} /> giáo viên
        </span>
      </div>
    </div>
  );
}
