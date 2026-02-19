import { RootState } from '@/core/store/store.ts';

export const userSelector = (state: RootState) => state.user;

export const userList = (state: RootState) => userSelector(state).userList;
