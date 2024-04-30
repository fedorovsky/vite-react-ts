import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { _SLICE_NAME_ } from './constants';

export const showModal = createAsyncThunk(
  `${_SLICE_NAME_}/showModal`,
  async (_, { dispatch }) => {
    return new Promise((resolve, reject) => {
      console.log('promise', resolve, reject);
      dispatch(modalSlice.actions.setModalOpen(true)); // Экшн, который открывает модальное окно
      dispatch(modalSlice.actions.setModalCallbacks({ resolve, reject })); // Экшн, который сохраняет коллбеки в стейт
    });
  },
);

type ConfirmModal = {
  isOpen: boolean;
  callbacks: {
    resolve: any;
    reject: any;
  };
};

const initialState: ConfirmModal = {
  isOpen: false,
  callbacks: {
    resolve: () => null,
    reject: () => null,
  },
};

const modalSlice = createSlice({
  name: _SLICE_NAME_,
  initialState,
  reducers: {
    // Reducer to open/close the modal
    setModalOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    // Reducer to set callback functions
    setModalCallbacks: (state, action) => {
      state.callbacks = action.payload;
    },
    // Reducer to reset modal state
    clearModal: (state) => {
      state.isOpen = false;
      state.callbacks = {
        resolve: () => null,
        reject: () => null,
      };
    },
  },
});

export const { actions, reducer } = modalSlice;
