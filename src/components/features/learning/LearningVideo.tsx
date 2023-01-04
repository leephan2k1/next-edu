// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { memo, useEffect, useState } from 'react';
import { playerOptions } from '~/constants';
import Player from '../videoPlayer/Player';

function LearningVideo() {
  /*
  artplayer player doesn't support TS
  Please contact me if you have any information :U Thanks!
  */
  const [artPlayer, setArtPlayer] = useState<unknown>();

  useEffect(() => {
    if (artPlayer) {
      artPlayer.on('video:timeupdate', () => {
        // console.log('currentTime:: ', artPlayer?.currentTime);
      });
    }
  }, [artPlayer]);

  return (
    <div className="h-[25rem] w-full bg-green-500/0 px-4 md:h-[50vh] lg:h-[80vh]">
      <Player
        option={{
          ...playerOptions,
          url: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4',
          title: '【新海诚动画】『秒速5センチメートル',
        }}
        className="my-auto h-full w-full rounded-2xl"
        getInstance={(art: unknown) => {
          setArtPlayer(art);
        }}
      />
    </div>
  );
}

export default memo(LearningVideo);
