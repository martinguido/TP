import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './counterSlice.js';

export const store = configureStore({
  reducer: {counter: counterReducer},
});
