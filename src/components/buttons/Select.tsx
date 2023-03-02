import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import type { Dispatch, SetStateAction } from 'react';
import { Fragment } from 'react';

interface SelectButtonProps {
  option?: { label: string; value: string };
  options: { label: string; value: string }[];
  setOption: Dispatch<
    SetStateAction<
      | {
          label: string;
          value: string;
        }
      | undefined
    >
  >;
}

export default function SelectButton({
  option,
  options,
  setOption,
}: SelectButtonProps) {
  return (
    <div className="w-[13rem]">
      <Listbox
        value={option}
        onChange={(value) => {
          if (setOption) setOption(value);
        }}
      >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg border border-gray-500 bg-white py-2 pl-3 pr-10 text-left text-xl shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
            <span className="block truncate">{option?.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-[300] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {options.map((opt, optIdx) => (
                <Listbox.Option
                  key={optIdx}
                  className={({ active }) =>
                    `relative z-[300] cursor-default select-none py-2 pl-10 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={opt}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {opt.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
