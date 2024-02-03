import { combineReducers } from '@reduxjs/toolkit';
import * as counterModule from './counter';

export default combineReducers({
  counter: counterModule.reducer,
});
