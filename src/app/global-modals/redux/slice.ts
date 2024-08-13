import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GLOBAL_MODAL_NAME } from './constants';

const _SLICE_NAME_ = 'global-modals';

export const initialState = {
  waitingList: [] as GLOBAL_MODAL_NAME[],
};

const slice = createSlice({
  name: _SLICE_NAME_,
  initialState,
  reducers: {
    addToWaitingList: (state, action: PayloadAction<GLOBAL_MODAL_NAME>) => {
      if (state.waitingList.includes(action.payload)) {
        return;
      }
      state.waitingList.push(action.payload);
    },
    removeFromWaitingList: (
      state,
      action: PayloadAction<GLOBAL_MODAL_NAME>,
    ) => {
      const modalIndex = state.waitingList.indexOf(action.payload);
      if (modalIndex >= 0) {
        state.waitingList.splice(modalIndex, 1);
      }
    },
    clearWaitingList: () => initialState,
  },
});

export const { actions, reducer } = slice;
