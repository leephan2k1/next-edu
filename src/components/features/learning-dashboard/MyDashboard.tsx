import dateFormat from 'dateformat';
import { group } from 'radash';
import { useMemo, useState } from 'react';
import { Else, If, Then } from 'react-if';
import Loading from '~/components/buttons/Loading';
import DashboardCard from '~/components/shared/DashboardCard';
import { dInVietnamese, mInVietnamese } from '~/constants';
import {
  getDaysInMonth,
  getFirstAndLastDayOfCurrWeek,
} from '~/utils/dateHandler';
import { trpc } from '~/utils/trpc';

import { ChartPieIcon, ClockIcon } from '@heroicons/react/24/outline';

import AreaChart from '../../shared/AreaChart';
import PieChart from '../../shared/PieChart';

import type { Student, User } from '@prisma/client';
interface MyDashboardProps {
  status: 'error' | 'success' | 'loading';
  data: Student & {
    courses: {
      category: {
        name: string;
      };
      instructor: User;
      id: string;
      name: string;
      slug: string;
      thumbnail: string | null;
      coursePrice: number | null;
    }[];
  };
}

export default function MyDashboard({ data }: MyDashboardProps) {
  const [filterTimeType, setFilterTimeType] = useState<
    'weekday' | 'month' | 'day'
  >('weekday');

  const groupCategories = group(data?.courses, (f) => f.category.name);

  const groupCoursePaid = group(data.courses, (f) =>
    String(Number(f.coursePrice) > 0),
  );

  const { data: timeStatus, status: statusFetchingTimeStatus } =
    trpc.user.findProgressTimeStatus.useQuery();

  const labelsAreaChart = useMemo(() => {
    if (filterTimeType === 'weekday') {
      const weekday: string[] = [];
      dInVietnamese.forEach((k) => {
        weekday.push(k);
      });
      return weekday;
    }

    if (filterTimeType === 'month') {
      return mInVietnamese;
    }

    if (filterTimeType === 'day') {
      return getDaysInMonth(
        new Date().getMonth(),
        new Date().getFullYear(),
      ).map((date) => dateFormat(date, 'dd/mm'));
    }

    return [];
  }, [filterTimeType]);

  return (
    <div className="min-h-screen w-full pt-[7rem] pb-[10rem] md:pt-[5rem]">
      <div className="mx-auto flex w-[90%] flex-col md:w-[80%]">
        <div className="flex w-full flex-col space-y-6 md:flex-row md:justify-evenly md:space-y-0 md:space-x-6">
          <DashboardCard
            title="Số khoá học đã ghi danh"
            data={data?.courses.length || 0}
            subData={`Có ${groupCoursePaid['true']?.length} khoá học có phí`}
          />
        </div>

        <div className="mt-14 flex w-full flex-col space-y-6">
          <h1 className="flex space-x-4 text-3xl">
            <ChartPieIcon className="h-8 w-8" />{' '}
            <span className="font-bold">
              Tỉ lệ danh mục khoá học đã ghi danh
            </span>
          </h1>

          <If condition={!data || data.courses.length === 0}>
            <Then>
              <div className="absolute-center min-h-[15rem] w-full">
                <p>
                  Chưa có dữ liệu theo dõi danh mục, có lẽ bạn chưa ghi danh
                  khoá học nào?
                </p>
              </div>
            </Then>

            <Else>
              <div className="absolute-center h-[30rem] max-h-[25rem] w-full md:max-h-[30rem] lg:max-h-[45rem]">
                <PieChart
                  labels={Object.keys(groupCategories)}
                  datasets={[
                    {
                      label: 'danh mục',
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      //@ts-ignore
                      data: Object.keys(groupCategories).map(
                        (key) => groupCategories[key]?.length,
                      ),
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                      ],
                      borderWidth: 2,
                    },
                  ]}
                />
              </div>
            </Else>
          </If>
        </div>

        <div className="mt-14 flex w-full flex-col space-y-6">
          <h1 className="flex space-x-4 text-3xl">
            <ClockIcon className="h-8 w-8" />{' '}
            <span className="font-bold">Thời gian học</span>
          </h1>

          <select
            onChange={(e) => {
              setFilterTimeType(
                e.currentTarget.value as 'weekday' | 'month' | 'day',
              );
            }}
            className="my-4 w-full max-w-sm overflow-hidden rounded-xl p-4"
          >
            <option value={'weekday'}>Theo thứ</option>
            <option value={'day'}>Theo ngày</option>
            <option value={'month'}>Theo tháng</option>
          </select>

          <If condition={statusFetchingTimeStatus === 'loading'}>
            <Then>
              <div className="absolute-center min-h-[10rem] w-full">
                <Loading />
              </div>
            </Then>
            <Else>
              {timeStatus ? (
                <div className="absolute-center h-[30rem] max-h-[25rem] w-full md:max-h-[30rem] lg:max-h-[45rem]">
                  <AreaChart
                    labels={labelsAreaChart}
                    chartTitle="Thời gian học trên Next Edu"
                    datasets={[
                      {
                        data: labelsAreaChart?.map((e) => {
                          const value = timeStatus?.filter((t) => {
                            if (filterTimeType === 'weekday') {
                              const [first, last] =
                                getFirstAndLastDayOfCurrWeek();

                              return (
                                dInVietnamese.get(dateFormat(t.date, 'ddd')) ===
                                  e &&
                                // make sure t.date in current this week
                                new Date(t.date).getTime() >=
                                  first?.getTime() &&
                                new Date(t.date).getTime() <= last?.getTime()
                              );
                            }

                            if (filterTimeType === 'month') {
                              return (
                                mInVietnamese[new Date(t.date).getMonth()] === e
                              );
                            }

                            if (filterTimeType === 'day') {
                              return dateFormat(t.date, 'dd/mm') === e;
                            }
                          });

                          const totalTimes = value
                            ? value.reduce(
                                (acc, e) => acc + e.timeInSecond,
                                0,
                              ) / 60
                            : 0;

                          return totalTimes > 1
                            ? Math.trunc(totalTimes)
                            : Number.parseFloat(String(totalTimes)).toFixed(1);
                        }),
                        fill: true,
                        label: 'Phút đã học',
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                      },
                    ]}
                  />
                </div>
              ) : (
                <p>
                  Chưa có dữ liệu theo dõi quá trình học, có lẽ bạn chưa tham
                  gia bài học nào?
                </p>
              )}
            </Else>
          </If>
        </div>
      </div>
    </div>
  );
}
