import dynamic from 'next/dynamic';
import { memo, useState } from 'react';

import LearningControlBar from './LearningControlBar';

import type { LearningOptions } from '~/types';

const Note = dynamic(() => import('~/components/features/note/NoteContainer'));
const Discuss = dynamic(
  () => import('~/components/features/discussion/DiscussionContainer'),
);
const Announce = dynamic(
  () => import('~/components/features/announce/AnnounceContainer'),
);
const Tools = dynamic(
  () => import('~/components/features/learning-tools/LearningToolsContainer'),
);
const Resources = dynamic(
  () => import('~/components/features/resources/ResourcesContainer'),
);

const SELECT_OPTIONS: { [key in LearningOptions]: JSX.Element } = {
  note: <Note />,
  discuss: <Discuss />,
  tools: <Tools />,
  announce: <Announce />,
  resources: <Resources />,
};

function BodyOptions() {
  const [option, selectOption] = useState<LearningOptions>('note');

  return (
    <div className="full-size mb-6">
      <LearningControlBar setOption={selectOption} />

      <div className="mx-auto min-h-[20rem] w-full pb-[10rem] md:max-w-[720px] lg:max-w-[1000px]">
        {SELECT_OPTIONS[option]}
      </div>
    </div>
  );
}

export default memo(BodyOptions);
