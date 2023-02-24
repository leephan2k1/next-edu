import { useRouter } from 'next/router';
import { RiDraftLine } from 'react-icons/ri';
import { SiGoogleclassroom } from 'react-icons/si';
import { VscTasklist } from 'react-icons/vsc';
import { PATHS } from '~/constants';
import ModernCourseCard from '../shared/ModernCourseCard';
import CoursesDraft from './CoursesDraft';

export default function CourseCreation() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col space-y-14 pt-[7rem] pb-[5rem] md:pt-[5rem]">
      <div className="mx-auto flex h-[10rem] w-[95%] items-center justify-between rounded border border-dashed border-gray-600 px-6 py-4 dark:border-white md:w-[80%] lg:w-[60%]">
        <p className="italic">
          Bắt đầu chia sẽ kiến thức hôm nay để mang giá trị đến cộng đồng!
        </p>
        <button
          onClick={() => router.push(`${PATHS.CREATE_COURSE}`)}
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

      <div className="mx-auto flex w-[90%] flex-col overflow-x-scroll md:w-[80%]">
        <h1 className="flex space-x-4 text-3xl">
          <RiDraftLine className="h-8 w-8" />
          <span className="font-bold">Khoá học đang soạn</span>
        </h1>

        <CoursesDraft />
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
