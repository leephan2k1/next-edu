import { atom, useAtom } from 'jotai';

export const searchModalState = atom(false);

export default function useSearchModalState() {
  return useAtom(searchModalState);
}
