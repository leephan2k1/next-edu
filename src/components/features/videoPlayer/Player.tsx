// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import Artplayer from 'artplayer';
import { useSetAtom } from 'jotai';
import { useRef } from 'react';
import { useEffectOnce } from 'usehooks-ts';
import { quillEditorState } from '~/atoms/quillEditorState';
import useLecture from '~/contexts/LearningContext';

export default function Player({ option, getInstance, ...rest }) {
  const setGoToEditor = useSetAtom(quillEditorState);
  const artRef = useRef<HTMLDivElement | null>(null);
  const lectureCtx = useLecture();

  useEffectOnce(() => {
    const art = new Artplayer({
      ...option,
      controls: [
        {
          disable: false,
          name: 'button',
          index: 10,
          position: 'right',
          html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
          <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
        </svg>
        `,
          tooltip: 'Ghi chú',
          style: {
            color: 'white',
          },
          click: () => {
            setGoToEditor(true);
          },
        },
        {
          disable: false,
          name: 'button2',
          index: 10,
          position: 'right',
          html: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>`,
          tooltip: 'Bài tiếp theo',
          style: {
            color: 'white',
          },
          click: () => {
            lectureCtx?.handleNavigateLecture('next');
          },
        },
        {
          disable: false,
          name: 'button3',
          index: 10,
          position: 'right',
          html: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>`,
          tooltip: 'Bài trước',
          style: {
            color: 'white',
          },
          click: () => {
            lectureCtx?.handleNavigateLecture('prev');
          },
        },
      ],
      container: artRef.current,
    });

    if (getInstance && typeof getInstance === 'function') {
      getInstance(art);
    }

    return () => {
      if (art && art.destroy) {
        art.destroy(false);
      }
    };
  });

  return <div className="relative" ref={artRef} {...rest}></div>;
}
