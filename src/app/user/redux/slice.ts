import { createSlice } from '@reduxjs/toolkit';
import { _SLICE_NAME_ } from './constants';

interface UserSlice {
  init: boolean;
}

const initialState: UserSlice = {
  init: true,
};

const slice = createSlice({
  name: _SLICE_NAME_,
  initialState,
  reducers: {},
});

export const { actions, reducer } = slice;
