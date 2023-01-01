import { BsStarFill } from 'react-icons/bs';
import { courseSidebarInViewport } from '~/atoms/courseSidebarAtom';
import { useAtomValue } from 'jotai';

export default function BuyOnly() {
  const sidebarInViewport = useAtomValue(courseSidebarInViewport);

  return (
    <div
      className={`smooth-effect fixed bottom-0 left-0 flex h-[7rem] w-screen justify-between bg-dark-background px-4 py-2 text-white/80 animate-in fade-in zoom-in dark:bg-white dark:text-gray-600 ${
        sidebarInViewport ? 'lg:hidden ' : ''
      }`}
    >
      <div className={`hidden max-w-[70%] flex-col py-2 md:flex`}>
        <h1 className="font-bold line-clamp-1">
          30-Day Money-Back Guarantee Development Web Development The Complete
          2023 Web Development Bootcamp
        </h1>

        <div className="flex w-full items-center space-x-2">
          <span className="mr-4">5.0</span>
          <BsStarFill className="h-5 w-5 text-yellow-500" />
          <BsStarFill className="h-5 w-5 text-yellow-500" />
          <BsStarFill className="h-5 w-5 text-yellow-500" />
          <BsStarFill className="h-5 w-5 text-yellow-500" />
          <BsStarFill className="h-5 w-5 text-yellow-500" />
        </div>
      </div>

      <div className="flex w-full items-center space-x-6 px-4 md:w-[30%] lg:w-[25%]">
        <h1 className="text-2xl font-bold">
          {new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(1950000)}
        </h1>
        <button className="btn-primary btn-lg btn flex-1">Mua ngay</button>
      </div>
    </div>
  );
}
