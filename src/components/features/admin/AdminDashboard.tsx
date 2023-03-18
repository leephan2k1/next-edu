import { Else, If, Then } from 'react-if';
import Loading from '~/components/buttons/Loading';
import DashboardCard from '~/components/shared/DashboardCard';
import HorizontalBarChart from '~/components/shared/HorizontalBarChart';
import { getDaysInMonth } from '~/utils/dateHandler';
import { mInVietnamese } from '~/constants';
import { group } from 'radash';

import {
  ChartBarIcon,
  ChartPieIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import dateFormat from 'dateformat';
import AreaChart from '../../shared/AreaChart';
import PieChart from '../../shared/PieChart';
import { trpc } from '~/utils/trpc';
import { useState, useMemo } from 'react';

type FilterType = 'day' | 'month';

export default function AdminDashboard() {
  const [filterType, setFilterTimeType] = useState<FilterType>('day');
  const { data: analysisData, status } =
    trpc.course.findAnalysisData.useQuery();

  const totalRevenue = useMemo(() => {
    if (!analysisData) return 0;

    const totalPayments = analysisData.totalPaidCourse.map((e) => ({
      price: e.coursePrice * e.payments.length,
    }));

    return totalPayments.reduce((acc, e) => acc + (e?.price || 0), 0);
  }, [analysisData]);

  const groupPaymentsByFilter = useMemo(() => {
    if (!analysisData) return null;

    const totalPayments = analysisData.totalPaidCourse.reduce((acc, elem) => {
      return acc.concat(
        elem.payments.map((e) => {
          return {
            ...e,
            price: elem.coursePrice,
            createdAt:
              filterType === 'day'
                ? dateFormat(new Date(e.createdAt), 'dd/mm')
                : `Tháng ${dateFormat(new Date(e.createdAt), 'm')}`,
          };
        }),
      );
    }, []);

    return group(totalPayments, (f) => f.createdAt);
  }, [filterType, analysisData]);

  const labelsAreaChart = useMemo(() => {
    return filterType === 'day'
      ? getDaysInMonth(new Date().getMonth(), new Date().getFullYear()).map(
          (date) => dateFormat(date, 'dd/mm'),
        )
      : mInVietnamese;
  }, [filterType]);

  return (
    <div className="min-h-screen w-full pt-[7rem] pb-[10rem] md:pt-[5rem]">
      <div className="mx-auto flex w-[90%] flex-col md:w-[80%]">
        <div className="flex w-full flex-col space-y-6 md:flex-row md:justify-evenly md:space-y-0 md:space-x-6">
          <DashboardCard
            title="Số khoá học trên hệ thống"
            data={analysisData?.numberCourses || 0}
          />

          <DashboardCard
            title="Số học sinh trên hệ thống"
            data={analysisData?.numberStudents || 0}
          />

          <DashboardCard
            title="Số tài nguyên đã đăng tải"
            data={analysisData?.numberResources || 0}
          />
        </div>

        <div className="mt-14 flex w-full flex-col space-y-6">
          <h1 className="flex space-x-4 text-3xl">
            <CurrencyDollarIcon className="h-8 w-8" />{' '}
            <span className="font-bold">
              Doanh thu trên toàn hệ thống:{' '}
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(totalRevenue)}
            </span>
          </h1>

          <select
            onChange={(e) => {
              setFilterTimeType(e.currentTarget.value as FilterType);
            }}
            className="my-4 w-full max-w-sm overflow-hidden rounded-xl p-4"
          >
            <option value={'day'}>Theo ngày</option>
            <option value={'month'}>Theo tháng</option>
          </select>

          <If condition={status === 'loading'}>
            <Then>
              <div className="absolute-center min-h-[10rem] w-full">
                <Loading />
              </div>
            </Then>

            <Else>
              <div className="absolute-center h-[30rem] max-h-[25rem] w-full md:max-h-[30rem] lg:max-h-[45rem]">
                <AreaChart
                  chartTitle="Báo cáo doanh thu từ khoá học"
                  labels={labelsAreaChart}
                  datasets={[
                    {
                      data: labelsAreaChart?.map((e) => {
                        if (groupPaymentsByFilter && groupPaymentsByFilter[e])
                          return groupPaymentsByFilter[e].reduce(
                            (acc, e) => acc + e.price,
                            0,
                          );

                        return 0;
                      }),
                      fill: true,
                      label: 'Việt Nam đồng',
                      borderColor: 'rgb(53, 162, 235)',
                      backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                  ]}
                />
              </div>
            </Else>
          </If>
        </div>

        <div className="mt-14 flex w-full flex-col space-y-6">
          <h1 className="flex space-x-4 text-3xl">
            <ChartPieIcon className="h-8 w-8" />{' '}
            <span className="font-bold">Tỉ lệ danh mục khoá học</span>
          </h1>

          <If condition={status === 'loading'}>
            <Then>
              <div className="absolute-center min-h-[10rem] w-full">
                <Loading />
              </div>
            </Then>

            <Else>
              {true ? (
                <div className="absolute-center h-[30rem] max-h-[25rem] w-full md:max-h-[30rem] lg:max-h-[45rem]">
                  <PieChart
                    labels={
                      analysisData
                        ? analysisData?.totalCourses.map((e) => e.category.name)
                        : []
                    }
                    datasets={[
                      {
                        label: 'số học sinh',
                        data:
                          analysisData?.totalCourses?.map(
                            (e) => e.students.length,
                          ) || [],
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
              ) : (
                <p>Chưa có dữ liệu về tỉ lệ khoá học được ghi danh</p>
              )}
            </Else>
          </If>
        </div>

        <div className="mt-14 flex w-full flex-col space-y-6">
          <h1 className="flex space-x-4 text-3xl">
            <ChartBarIcon className="h-8 w-8" />{' '}
            <span className="font-bold">Khoá học có lượt mua nhiều nhất</span>
          </h1>

          <If condition={status === 'loading'}>
            <Then>
              <div className="absolute-center min-h-[10rem] w-full">
                <Loading />
              </div>
            </Then>

            <Else>
              {true ? (
                <div className="absolute-center h-[30rem] w-full">
                  <HorizontalBarChart
                    chartTitle="Xếp hạng khoá học theo doanh thu"
                    data={{
                      labels:
                        analysisData?.topPaidCourse.map((e) => e.name) || [],
                      datasets: [
                        {
                          label: 'Số lượng mua',
                          data:
                            analysisData?.topPaidCourse.map(
                              (e) => e.payments.length,
                            ) || [],
                          borderColor: 'rgb(255, 99, 132)',
                          backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                      ],
                    }}
                  />
                </div>
              ) : (
                <p>Chưa có dữ liệu về tỉ lệ đánh giá</p>
              )}
            </Else>
          </If>
        </div>
      </div>
    </div>
  );
}
