import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

const DayItem = ({
  label,
  selectedProps,
  setSelections,
}: {
  label: string;
  selectedProps: boolean;
  setSelections: Dispatch<
    SetStateAction<
      {
        timeLabel: string;
        selected: boolean;
        timeValue: string;
      }[]
    >
  >;
}) => {
  const [selected, setSelected] = useState(selectedProps);
  return (
    <>
      <button
        onClick={() => {
          setSelected((prevState) => !prevState);
          setSelections((selections) =>
            selections.map((s) => {
              if (s.timeLabel === label) {
                return { ...s, selected: !s.selected };
              }

              return s;
            }),
          );
        }}
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
  setSelections: Dispatch<
    SetStateAction<
      {
        timeLabel: string;
        selected: boolean;
        timeValue: string;
      }[]
    >
  >;
}

export default function DateSelect({ data, setSelections }: DateSelectProps) {
  return (
    <div className="my-4 flex space-x-4">
      {data.map((time) => {
        return (
          <DayItem
            setSelections={setSelections}
            label={time.timeLabel}
            key={time.timeLabel}
            selectedProps={time.selected}
          />
        );
      })}
    </div>
  );
}
