import { createAsyncThunk } from '@reduxjs/toolkit';
import { edgeConfigApi } from '../api';
import { _SLICE_NAME_ } from './constants.ts';

// export const getConfig = createAsyncThunk(
//   `${_SLICE_NAME_}/getConfig`,
//   async (lang: string, { dispatch }) => {
//     const data = await dispatch(
//       edgeConfigApi.endpoints.getConfig.initiate({ lang }),
//     ).unwrap();
//
//     console.log('=======================');
//     console.log('GET CONFIG', data);
//     console.log('=======================');
//
//     console.log('config', data);
//
//     return data;
//   },
// );

/**
 * With manual unsubscription (if needed)
 */
export const getConfig = createAsyncThunk(
  `${_SLICE_NAME_}/getConfig`,
  async (lang: string, { dispatch }) => {
    const promise = dispatch(
      edgeConfigApi.endpoints.getConfig.initiate({ lang }),
    );

    try {
      return await promise.unwrap();
    } finally {
      promise.unsubscribe(); // keepUnusedDataFor: 60
    }
  },
);
