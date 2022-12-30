import { MdPeopleOutline } from 'react-icons/md';
import { SiGoogleclassroom } from 'react-icons/si';
import { FaChalkboardTeacher } from 'react-icons/fa';

export default function Achievement() {
  return (
    <div className="mt-4 flex w-full justify-evenly bg-white px-4 py-10 dark:bg-dark-background">
      <div className="flex items-center space-x-4">
        <span className="absolute-center h-14 w-14 rounded-full bg-indigo-500">
          <SiGoogleclassroom className="text-white" />
        </span>
        <span>100 khoá học</span>
      </div>

      <div className="flex items-center space-x-4">
        <span className="absolute-center h-14 w-14 rounded-full bg-sky-500">
          <MdPeopleOutline className="text-white" />
        </span>
        <span>100 học sinh</span>
      </div>

      <div className="flex items-center space-x-4">
        <span className="absolute-center h-14 w-14 rounded-full bg-orange-500">
          <FaChalkboardTeacher className="text-white" />
        </span>
        <span>100 giáo viên</span>
      </div>
    </div>
  );
}
