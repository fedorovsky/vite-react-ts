import { createSlice } from '@reduxjs/toolkit';
import { _SLICE_NAME_ } from './constants';

interface CounterSlice {
  value: number;
}

const initialState: CounterSlice = {
  value: 0,
};

const slice = createSlice({
  name: _SLICE_NAME_,
  initialState,
  reducers: {
    increment: (state) => {
      state.value = state.value + 1;
    },
    decrement: (state) => {
      state.value = state.value - 1;
    },
  },
});

export const { actions, reducer, name } = slice;
