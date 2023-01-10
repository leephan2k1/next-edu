import { memo } from 'react';
import { useAtomValue } from 'jotai';
import { videoCurrentTime } from '~/atoms/videoCurrentTime';
import { getTime } from '~/utils/numberHandler';

function CurrentTimeBtn() {
  const videoCurrentTimeValue = useAtomValue(videoCurrentTime);

  return <span>{getTime(videoCurrentTimeValue)}</span>;
}

export default memo(CurrentTimeBtn);
