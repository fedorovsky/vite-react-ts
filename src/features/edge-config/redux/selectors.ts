import { RootState } from '@/core/store/store.ts';

export const selectConfig = (state: RootState) => state.config;

export const selectData = (state: RootState) => selectConfig(state).data;

export const htmlAttributes = (state: RootState) =>
  selectData(state).htmlAttributes;
