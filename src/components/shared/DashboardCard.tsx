import { CountUp } from 'use-count-up';

export default function DashboardCard({
  title,
  data,
  subData,
}: {
  title: string;
  data: number;
  subData?: string;
}) {
  return (
    <div className="flex h-[20rem] w-full flex-col items-center justify-center rounded-2xl bg-white p-6 dark:bg-dark-background md:w-1/2 lg:w-[30%]">
      <h1 className="min-h-[4.8rem] font-semibold capitalize text-gray-400">
        {title}
      </h1>
      <h4 className="mb-10 text-5xl font-bold">
        <CountUp isCounting end={data} duration={1.5} />
      </h4>

      {subData ? (
        <span className="text-xl italic text-gray-400">{subData}</span>
      ) : null}
    </div>
  );
}
