import { SiGoogleclassroom } from 'react-icons/si';
import ModernCourseCard from '../shared/ModernCourseCard';
import { useSetAtom } from 'jotai';
import { teachingSections } from '~/atoms/teachingSections';
import { RiDraftLine } from 'react-icons/ri';
import { VscTasklist } from 'react-icons/vsc';

export default function CourseCreation() {
  const setSection = useSetAtom(teachingSections);

  return (
    <div className="flex min-h-screen flex-col space-y-14 pt-[7rem] pb-[5rem] md:pt-[5rem]">
      <div className="mx-auto flex h-[10rem] w-[95%] items-center justify-between rounded border border-dashed border-gray-600 px-6 py-4 dark:border-white md:w-[80%] lg:w-[60%]">
        <p className="italic">
          Bắt đầu chia sẽ kiến thức hôm nay để mang giá trị đến cộng đồng!
        </p>
        <button
          onClick={() => setSection('CourseCreation')}
          className="smooth-effect w-fit min-w-fit rounded-xl bg-yellow-100 p-4 text-yellow-800 shadow-xl hover:scale-110 dark:text-gray-700"
        >
          Tạo khoá học
        </button>
      </div>
      <div className="mx-auto flex w-[90%] flex-col md:w-[80%]">
        <h1 className="flex space-x-4 text-3xl">
          <SiGoogleclassroom className="h-8 w-8" />{' '}
          <span className="font-bold">Khoá học đang hướng dẫn</span>
        </h1>
        {/* <h4 className="my-4 italic">Bạn chưa hướng dẫn khoá học nào!</h4> */}
        <ul className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          <li>
            <ModernCourseCard />
          </li>
          <li>
            <ModernCourseCard />
          </li>
          <li>
            <ModernCourseCard />
          </li>
          <li>
            <ModernCourseCard />
          </li>
          <li>
            <ModernCourseCard />
          </li>
        </ul>
      </div>

      <div className="mx-auto flex w-[90%] flex-col md:w-[80%]">
        <h1 className="flex space-x-4 text-3xl">
          <RiDraftLine className="h-8 w-8" />
          <span className="font-bold">Khoá học đang soạn</span>
        </h1>
        {/* <h4 className="my-4 italic">Bạn chưa soạn khoá học nào!</h4> */}
        <ul className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          <li>
            <ModernCourseCard />
          </li>
          <li>
            <ModernCourseCard />
          </li>
          <li>
            <ModernCourseCard />
          </li>
          <li>
            <ModernCourseCard />
          </li>
          <li>
            <ModernCourseCard />
          </li>
        </ul>
      </div>

      <div className="mx-auto flex w-[90%] flex-col md:w-[80%]">
        <h1 className="flex space-x-4 text-3xl">
          <VscTasklist className="h-8 w-8" />{' '}
          <span className="font-bold">Khoá học đang chờ phê duyệt</span>
        </h1>
        {/* <h4 className="my-4 italic">Bạn chưa hướng dẫn khoá học nào!</h4> */}
        <ul className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          <li>
            <ModernCourseCard />
          </li>
          <li>
            <ModernCourseCard />
          </li>
          <li>
            <ModernCourseCard />
          </li>
          <li>
            <ModernCourseCard />
          </li>
          <li>
            <ModernCourseCard />
          </li>
        </ul>
      </div>
    </div>
  );
}
