import { RootState } from '@/core/store/store.ts';

export const list = (state: RootState) => state.notification.list;

export const count = (state: RootState) => state.notification.list.length;

export const secondMessage = (state: RootState) => state.notification.list[1];
