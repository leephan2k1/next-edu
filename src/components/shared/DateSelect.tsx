import { useState } from 'react';

const DayItem = ({
  label,
  selectedProps,
}: {
  label: string;
  selectedProps: boolean;
}) => {
  const [selected, setSelected] = useState(selectedProps);
  return (
    <>
      <button
        onClick={() => setSelected((prevState) => !prevState)}
        className={`${
          selected
            ? 'bg-yellow-500 text-white'
            : 'border border-gray-600 dark:border-white'
        } smooth-effect h-16 w-16 rounded-full text-gray-600 dark:text-white`}
      >
        {label}
      </button>
    </>
  );
};

interface DateSelectProps {
  data: { timeLabel: string; selected: boolean }[];
}

export default function DateSelect({ data }: DateSelectProps) {
  return (
    <div className="flex space-x-4">
      {data.map((time) => {
        return (
          <DayItem
            label={time.timeLabel}
            key={time.timeLabel}
            selectedProps={time.selected}
          />
        );
      })}
    </div>
  );
}
