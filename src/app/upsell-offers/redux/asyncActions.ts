import { createAsyncThunk } from '@reduxjs/toolkit';
import { _SLICE_NAME_ } from './constants';
import { BillingPack, ModalData } from './types';
import { deferredObject } from './utils';

export const openModalWithPromise = createAsyncThunk<BillingPack, ModalData>(
  `${_SLICE_NAME_}/openModalWithPromise`,
  async () => {
    return new Promise((res, rej) => {
      deferredObject.resolve = res;
      deferredObject.reject = rej;
    });
  },
);
