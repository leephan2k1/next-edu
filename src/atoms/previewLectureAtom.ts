import { atom } from 'jotai';
import type { ResourceType } from '~/types';

export const previewModalState = atom(false);

export const resources = atom<ResourceType[]>([]);
