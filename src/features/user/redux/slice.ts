import { createSlice } from '@reduxjs/toolkit';
import { _SLICE_NAME_ } from './constants';
import { getUserList } from './asyncActions.ts';
import { UserSlice } from './types.ts';

const initialState: UserSlice = {
  status: 'idle',
  userList: [],
};

const slice = createSlice({
  name: _SLICE_NAME_,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserList.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.userList = action.payload;
      })
      .addCase(getUserList.rejected, (state) => {
        state.status = 'rejected';
      });
  },
});

export const { actions, reducer } = slice;
