// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { whiteBoardData, whiteBoardState } from '~/atoms/whiteBoardData';
import Loading from '~/components/buttons/Loading';
import ClientOnly from '~/components/shared/ClientOnly';

export default function WhiteBoard() {
  const excalidrawRef = useRef();
  const [Excalidraw, setExcalidraw] = useState(null);
  const [drawData, setDrawData] = useAtom(whiteBoardData);
  const [stateData, setStateData] = useAtom(whiteBoardState);

  // Excalidraw doesn't support SSR
  useEffect(() => {
    import('@excalidraw/excalidraw').then((comp) =>
      setExcalidraw(comp.Excalidraw),
    );
  }, []);

  const onChange = (elements, state) => {
    if (elements.length > 0) {
      setDrawData(elements);
      setStateData(state);
    }
  };

  return (
    <ClientOnly>
      <div className="absolute-center h-[50rem] w-full">
        {Excalidraw ? (
          <Excalidraw
            ref={excalidrawRef}
            initialData={{ elements: drawData, appState: stateData }}
            onChange={onChange}
          />
        ) : (
          <Loading styles="w-10 h-10" />
        )}
      </div>
    </ClientOnly>
  );
}
