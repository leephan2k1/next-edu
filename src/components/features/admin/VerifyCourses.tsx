import { memo, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Else, If, Then } from 'react-if';
import Loading from '~/components/buttons/Loading';
import { trpc } from '~/utils/trpc';
import { PATHS } from '~/constants';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

import type { CourseType } from '~/types';

import type { VerifiedStateType } from '~/types';
import type { Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface VerifyCoursesProps {
  title: string;
  shouldRefetch?: boolean;
  setOpenPreviewModal: Dispatch<SetStateAction<boolean>>;
  setCourse: Dispatch<SetStateAction<CourseType | null>>;
  setShouldRefetch: Dispatch<
    SetStateAction<{
      pending: boolean;
      approved: boolean;
      reject: boolean;
    }>
  >;
  queryKeys: {
    verified: VerifiedStateType;
    published: boolean;
  };
}

function VerifyCourses({
  title,
  setOpenPreviewModal,
  setCourse,
  queryKeys,
  shouldRefetch,
  setShouldRefetch,
}: VerifyCoursesProps) {
  const router = useRouter();
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const {
    data: courses,
    isLoading,
    refetch,
  } = trpc.course.findWaitingListCourses.useQuery(queryKeys);

  const {
    mutate: approveCourse,
    isSuccess,
    isError,
  } = trpc.course.verifyCourse.useMutation();

  useEffect(() => {
    if (shouldRefetch) {
      refetch();
    }
    setShouldRefetch((prevState) => ({
      ...prevState,
      [queryKeys.verified.toLowerCase()]: false,
    }));
  }, [shouldRefetch]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Thao tác thành công!');
      refetch();
      switch (queryKeys.verified) {
        case 'APPROVED':
          setShouldRefetch((prevState) => ({
            ...prevState,
            pending: true,
            reject: true,
          }));
          break;
        case 'PENDING':
          setShouldRefetch((prevState) => ({
            ...prevState,
            approved: true,
            reject: true,
          }));
          break;
        case 'REJECT':
          setShouldRefetch((prevState) => ({
            ...prevState,
            approved: true,
            pending: true,
          }));
          break;
      }
      setSelectedCourses([]);
    }
    if (isError) {
      toast.error('Phê duyệt thất bại! Thử lại!');
    }
  }, [isSuccess, isError]);

  const handleAction = async (action: VerifiedStateType, isAll?: boolean) => {
    if (!courses) return;

    try {
      if (isAll && courses) {
        approveCourse({
          verified: action,
          coursesId: courses.map((course) => course.id),
        });
        await Promise.allSettled(
          courses?.map(async (c) => {
            return await axios.post(`/api/notification`, {
              location: `/${PATHS.COURSE}/${c.slug}`,
              content: `Khoá học ${c.name} của bạn đã được phê duyệt`,
              userId: c.instructor.id,
            });
          }),
        );
        return;
      }

      approveCourse({ verified: action, coursesId: selectedCourses });
      await Promise.allSettled(
        courses?.map(async (c) => {
          return await axios.post(`/api/notification`, {
            location: `/${PATHS.COURSE}/${c.slug}`,
            content: `Khoá học ${c.name} của bạn đã được phê duyệt`,
            userId: c.instructor.id,
          });
        }),
      );
    } catch (error) {
      console.error('handle action error: ', error);
    }
  };

  return (
    <>
      <div className="flex w-full flex-col px-6 pt-24 md:pt-20">
        <h1 className="mb-6 text-3xl font-bold">{title}</h1>

        <div className="my-4 flex items-center space-x-4 overflow-x-scroll">
          {Array.isArray(courses) && courses.length > 0 && (
            <>
              <button
                onClick={() => {
                  handleAction('APPROVED', true);
                }}
                className="w-fit min-w-[14rem] rounded-2xl border border-gray-500 py-3 px-4 dark:border-white"
              >
                Phê duyệt tất cả
              </button>
            </>
          )}

          {selectedCourses.length > 0 && (
            <>
              <button
                onClick={() => handleAction('APPROVED')}
                className="w-fit min-w-[9rem] rounded-2xl bg-green-100 py-3 px-4 font-bold text-green-800"
              >
                Phê duyệt
              </button>

              <button
                onClick={() => handleAction('REJECT')}
                className="w-fit min-w-[7.5rem] rounded-2xl bg-red-100 py-3 px-4 font-bold text-red-900 dark:border-white"
              >
                Từ chối
              </button>
            </>
          )}
        </div>

        <If condition={isLoading}>
          <Then>
            <div className="absolute-center h-[10rem] w-full overflow-x-scroll lg:max-w-[90%]">
              <Loading />
            </div>
          </Then>

          <Else>
            <If condition={Array.isArray(courses) && courses.length > 0}>
              <Then>
                <div className="w-full overflow-x-scroll lg:max-w-[90%]">
                  <table className="w-full table-auto">
                    <thead className="select-none">
                      <tr>
                        <th></th>
                        <th className="whitespace-nowrap  px-4 py-3">
                          Tên khoá học
                        </th>
                        <th className="whitespace-nowrap  px-4 py-3">
                          Ngày tạo
                        </th>
                        <th className="whitespace-nowrap  px-4 py-3">
                          Ngày cập nhật
                        </th>
                        <th className="whitespace-nowrap  px-4 py-3">
                          Đường dẫn khoá học
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className="rounded-xl">
                      {courses?.map((course) => {
                        return (
                          <tr
                            key={course.id}
                            className="smooth-effect rounded-2xl odd:bg-slate-300 odd:dark:bg-dark-background"
                          >
                            <th className="px-6">
                              <div className="full-size absolute-center">
                                <input
                                  onClick={(e) => {
                                    if (e.currentTarget.checked) {
                                      setSelectedCourses((prevState) => [
                                        ...prevState,
                                        course.id,
                                      ]);
                                    } else {
                                      setSelectedCourses((prevState) =>
                                        prevState.filter(
                                          (courseId) => courseId !== course.id,
                                        ),
                                      );
                                    }
                                  }}
                                  type="checkbox"
                                  className="checkbox-success checkbox checkbox-lg"
                                />
                              </div>
                            </th>
                            <td className="min-w-[20rem] py-6 lg:min-w-min lg:py-4">
                              {course.name}
                            </td>
                            <td className="text-center">
                              {course.createdAt.toLocaleDateString('vi-VI')}
                            </td>
                            <td className="text-center">
                              {course.updatedAt.toLocaleDateString('vi-VI')}
                            </td>
                            <td className={`text-center`}>{course.slug}</td>
                            <td
                              onClick={() => {
                                setOpenPreviewModal(true);
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                //@ts-ignore
                                setCourse(course);
                              }}
                              className={`smooth-effect cursor-pointer px-4 text-center hover:text-green-500`}
                            >
                              <InformationCircleIcon className="h-8 w-8" />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Then>
              <Else>
                <p>Chưa có danh sách!</p>
              </Else>
            </If>
          </Else>
        </If>
      </div>
    </>
  );
}

export default memo(VerifyCourses);
