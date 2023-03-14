import { Fragment, useState, useEffect } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

interface ComboBoxProps {
  selections: {
    id: number;
    name: string;
  }[];
  getSelectedValue: (value: string) => void;
}

export default function ComboBox({
  selections,
  getSelectedValue,
}: ComboBoxProps) {
  const [selected, setSelected] = useState(selections[0]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (selected?.name) {
      getSelectedValue(selected?.name);
    }
  }, [selected]);

  const filteredSelection =
    query === ''
      ? selections
      : selections.filter((selection) =>
          selection.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        );

  return (
    <Combobox value={selected} onChange={setSelected}>
      <div className="relative my-4 min-w-[30rem] max-w-[30rem] cursor-default rounded-lg bg-white p-3 text-left text-2xl shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 dark:bg-dark-background md:min-w-[45rem] md:max-w-[45rem]">
        <Combobox.Input
          className="w-full border-none bg-transparent py-2 pl-3 pr-10 text-2xl leading-5 focus:ring-0"
          displayValue={(selection) => selection.name}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon
            className="h-8 w-8 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options className="absolute top-[100%] left-0 max-h-80 min-w-[30rem] max-w-[30rem] overflow-auto rounded-md bg-white py-1 text-2xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-dark-background md:min-w-[45rem] md:max-w-[45rem]">
            {filteredSelection.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredSelection.map((person) => (
                <Combobox.Option
                  key={person.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? 'bg-yellow-400 text-white'
                        : 'text-gray-900 dark:text-white'
                    }`
                  }
                  value={person}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-teal-600'
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}
