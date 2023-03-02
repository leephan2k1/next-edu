import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

import { TrashIcon } from '@heroicons/react/24/solid';

interface RemoveButtonProps {
  removeAction: () => void;
}

export default function RemoveButton({ removeAction }: RemoveButtonProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const [isOpenConfirm, setOpenConfirm] = useState(false);

  useOnClickOutside(ref, () => setOpenConfirm(false));

  return (
    <div className="relative">
      <button
        onClick={() => setOpenConfirm(true)}
        className="smooth-effect relative rounded-xl p-4 hover:bg-white dark:hover:bg-dark-background"
      >
        <TrashIcon className="h-5 w-5" />
      </button>

      {isOpenConfirm && (
        <div
          ref={ref}
          className="absolute -top-[250%] right-0 flex w-[15rem] flex-col space-y-3 rounded-xl bg-white py-2 text-gray-600"
        >
          <h4 className="text-center">Xoá ghi chú này?</h4>

          <div className="flex items-center justify-between space-x-4 px-4">
            <button
              onClick={() => {
                removeAction();
                setOpenConfirm(false);
              }}
              className="rounded-xl bg-rose-500 px-3 py-2 text-white"
            >
              Xoá
            </button>
            <button onClick={() => setOpenConfirm(false)} className="p-3">
              Huỷ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
