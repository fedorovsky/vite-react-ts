import { RootState } from '@/core/store/store.ts';

export const counter = (state: RootState) => state.counter;

export const value = (state: RootState) => state.counter.value;
