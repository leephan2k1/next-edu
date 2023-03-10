import { useRouter } from 'next/router';
import type { ChangeEvent } from 'react';
import usePushQuery from '~/hooks/usePushQuery';

interface FilterProps {
  label: string;
  queryParams: string;
  options: { label: string; value: string }[];
}

export default function Filter({ label, options, queryParams }: FilterProps) {
  const router = useRouter();
  const query = usePushQuery();

  const handleOnChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    query.push(queryParams, e.currentTarget.value, undefined, true);
  };

  return (
    <div className="flex min-w-[25rem] max-w-sm flex-col space-y-4">
      <label className="text-2xl font-semibold md:text-3xl">{label}</label>
      <select
        onChange={handleOnChangeSelect}
        className="my-4 w-full overflow-hidden rounded-xl p-4"
      >
        {options &&
          options.length > 0 &&
          options.map((opt) => {
            return (
              <option
                selected={router.query[queryParams] === opt.value}
                key={opt.value}
                value={opt.value}
              >
                {opt.label}
              </option>
            );
          })}
      </select>
    </div>
  );
}
