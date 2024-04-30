import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { _SLICE_NAME_ } from './constants';
import { openModalWithPromise } from './asyncActions';
import { BillingPack, ModalData } from './types';
import { deferredObject } from './utils';

console.log('======');
console.log('deferredObject', deferredObject);
console.log('======');

type UpsellOffers = {
  isVisibleModal: boolean;
  data: ModalData;
};

const initialState: UpsellOffers = {
  isVisibleModal: false,
  data: {
    regular: {
      priceId: 0,
      customData: '',
      title: '',
      items: [],
    },
    upsell: {
      priceId: 0,
      customData: '',
      title: '',
      items: [],
    },
  },
};

export const modalSlice = createSlice({
  name: _SLICE_NAME_,
  initialState,
  reducers: {
    resolveModal(state, action: PayloadAction<BillingPack>) {
      state.isVisibleModal = false;

      if (deferredObject.resolve) {
        deferredObject.resolve(action.payload);
        deferredObject.resolve = null;
        deferredObject.reject = null;
      }
    },
    rejectModal(state) {
      state.isVisibleModal = false;

      if (deferredObject.reject) {
        deferredObject.reject(new Error('error'));
        deferredObject.resolve = null;
        deferredObject.reject = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(openModalWithPromise.pending, (state, action) => {
      state.isVisibleModal = true;
      state.data = action.meta.arg;
    });
  },
});

export const { actions, reducer } = modalSlice;
