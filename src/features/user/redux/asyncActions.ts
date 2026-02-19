import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserListData } from '../api';
import { _SLICE_NAME_ } from './constants.ts';

export const getUserList = createAsyncThunk(
  `${_SLICE_NAME_}/getUserList`,
  async () => {
    const data = await getUserListData();

    return data;
  },
);
