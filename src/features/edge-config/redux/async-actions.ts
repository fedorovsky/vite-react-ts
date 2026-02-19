import { createAsyncThunk } from '@reduxjs/toolkit';
import { edgeConfigApi } from '../api';
import { _SLICE_NAME_ } from './constants.ts';

export const getConfig = createAsyncThunk(
  `${_SLICE_NAME_}/getConfig`,
  async (lang: string, { dispatch }) => {
    // const data = await getUserListData();

    const data = await dispatch(
      edgeConfigApi.endpoints.getConfig.initiate({ lang }),
    ).unwrap();

    console.log('config', data);

    return data;
  },
);
