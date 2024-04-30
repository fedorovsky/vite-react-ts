import { createSlice } from '@reduxjs/toolkit';
import * as actionTypes from './constants';

type UpsellOffers = {
  isOpen: boolean;
};

const initialState: UpsellOffers = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actionTypes.OPEN_MODAL, (state) => {
        state.isOpen = true;
      })
      .addCase(actionTypes.CLOSE_MODAL, (state) => {
        state.isOpen = false;
      });
  },
});

export const { actions, reducer } = modalSlice;
