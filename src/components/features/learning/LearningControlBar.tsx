import { memo, useState } from 'react';
import {
  PencilSquareIcon,
  ChatBubbleBottomCenterIcon,
  WrenchIcon,
  DocumentChartBarIcon,
  BellIcon,
} from '@heroicons/react/24/outline';

const Mapping_Icon: { [key: string]: JSX.Element } = {
  'Ghi chú': <PencilSquareIcon className="h-6 w-6" />,
  'Thảo luận': <ChatBubbleBottomCenterIcon className="h-6 w-6" />,
  'Công cụ học': <WrenchIcon className="h-6 w-6" />,
  'Tài nguyên': <DocumentChartBarIcon className="h-6 w-6" />,
  'Thông báo': <BellIcon className="h-6 w-6" />,
} as const;

function LearningControlBar() {
  const [selectIndex, setSelectIndex] = useState(0);

  return (
    <div className="w-full lg:h-[20vh]">
      <div className="mx-auto w-full overflow-x-scroll py-4 md:max-w-[720px] lg:max-w-[1200px]">
        <div className="tabs mx-auto flex h-fit w-fit flex-nowrap justify-start space-y-6">
          {Array.from([
            'Ghi chú',
            'Thảo luận',
            'Công cụ học',
            'Tài nguyên',
            'Thông báo',
          ]).map((btnContent, index) => {
            return (
              <button
                onClick={() => setSelectIndex(index)}
                key={btnContent}
                style={{
                  color: selectIndex === index ? '#4b5563' : '',
                }}
                className={`${
                  selectIndex === index ? 'tab-active' : ''
                } smooth-effect tab tab-lifted tab-lg flex min-w-fit flex-nowrap space-x-2 text-3xl text-gray-600 dark:text-white/80`}
              >
                {Mapping_Icon[btnContent]}
                <span>{btnContent}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default memo(LearningControlBar);
