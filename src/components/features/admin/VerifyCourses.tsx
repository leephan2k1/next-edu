import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

interface VerifyCoursesProps {
  title: string;
}

export default function VerifyCourses({ title }: VerifyCoursesProps) {
  return (
    <div className="flex w-full flex-col px-6 pt-24 md:pt-20">
      <h1 className="mb-6 text-3xl font-bold">{title}</h1>

      <div className="my-4 flex items-center space-x-4 overflow-x-scroll">
        <button className="w-fit min-w-[14rem] rounded-2xl border border-gray-500 py-3 px-4 dark:border-white">
          Phê duyệt tất cả
        </button>

        <button className="w-fit min-w-[9rem] rounded-2xl bg-green-100 py-3 px-4 font-bold text-green-800">
          Phê duyệt
        </button>

        <button className="w-fit min-w-[7.5rem] rounded-2xl bg-red-100 py-3 px-4 font-bold text-red-900 dark:border-white">
          Từ chối
        </button>
      </div>

      <div className="w-full overflow-x-scroll lg:max-w-[90%]">
        <table className="w-full table-auto">
          <thead className="select-none">
            <tr>
              <th></th>
              <th className="whitespace-nowrap  px-4 py-3">Tên khoá học</th>
              <th className="whitespace-nowrap  px-4 py-3">Ngày tạo</th>
              <th className="whitespace-nowrap  px-4 py-3">Ngày cập nhật</th>
              <th className="whitespace-nowrap  px-4 py-3">
                Đường dẫn khoá học
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody className="rounded-xl">
            <tr className="smooth-effect rounded-2xl odd:bg-slate-300 odd:dark:bg-dark-background">
              <th className="px-6">
                <div className="full-size absolute-center">
                  <input
                    type="checkbox"
                    className="checkbox-success checkbox checkbox-lg"
                  />
                </div>
              </th>
              <td className="min-w-[20rem] py-6 lg:min-w-min lg:py-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </td>
              <td className="text-center">ádada</td>
              <td className="text-center">ádada</td>
              <td className={`text-center`}>ádada</td>
              <td
                className={`smooth-effect cursor-pointer px-4 text-center hover:text-green-500`}
              >
                <InformationCircleIcon className="h-8 w-8" />
              </td>
            </tr>

            <tr className="smooth-effect rounded-2xl odd:bg-slate-300 odd:dark:bg-dark-background">
              <th className="px-6">
                <div className="full-size absolute-center">
                  <input
                    type="checkbox"
                    className="checkbox-success checkbox checkbox-lg"
                  />
                </div>
              </th>
              <td className="min-w-[20rem] py-6 lg:min-w-min lg:py-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </td>
              <td className="text-center">ádada</td>
              <td className="text-center">ádada</td>
              <td className={`text-center`}>ádada</td>
              <td
                className={`smooth-effect cursor-pointer px-4 text-center hover:text-green-500`}
              >
                <InformationCircleIcon className="h-8 w-8" />
              </td>
            </tr>

            <tr className="smooth-effect rounded-2xl odd:bg-slate-300 odd:dark:bg-dark-background">
              <th className="px-6">
                <div className="full-size absolute-center">
                  <input
                    type="checkbox"
                    className="checkbox-success checkbox checkbox-lg"
                  />
                </div>
              </th>
              <td className="min-w-[20rem] py-6 lg:min-w-min lg:py-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </td>
              <td className="text-center">ádada</td>
              <td className="text-center">ádada</td>
              <td className={`text-center`}>ádada</td>
              <td
                className={`smooth-effect cursor-pointer px-4 text-center hover:text-green-500`}
              >
                <InformationCircleIcon className="h-8 w-8" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
