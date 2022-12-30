import type { ReactNode } from 'react';
import { nunito } from '~/constants';

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <div
      style={{
        fontFamily: nunito.style.fontFamily,
      }}
      className="mx-auto flex h-fit max-w-[1300px] flex-col"
    >
      {children}
    </div>
  );
}
