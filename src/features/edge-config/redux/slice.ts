import { createSlice } from '@reduxjs/toolkit';
import { _SLICE_NAME_ } from './constants';
import { getConfig } from './async-actions.ts';
import { ConfigSlice } from './types.ts';

const initialState: ConfigSlice = {
  status: 'idle',
  data: {},
};

const slice = createSlice({
  name: _SLICE_NAME_,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getConfig.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getConfig.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(getConfig.rejected, (state) => {
        state.status = 'rejected';
      });
  },
});

export const { actions, reducer } = slice;
