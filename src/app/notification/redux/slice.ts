import { createSlice } from '@reduxjs/toolkit';
import { _SLICE_NAME_ } from './constants';

type Notification = {
  title: string;
  description: string;
};

interface NotificationSlice {
  list: Notification[];
}

const initialState: NotificationSlice = {
  list: [],
};

const slice = createSlice({
  name: _SLICE_NAME_,
  initialState,
  reducers: {
    addMessage: (state) => {
      state.list.push({
        title: `title: ${Date.now()}`,
        description: `description: ${Date.now()}`,
      });
    },
    changeFirstMessage: (state) => {
      state.list[0].title = `changed: ${Date.now()}`;
    },
  },
});

export const { actions, reducer, name } = slice;
