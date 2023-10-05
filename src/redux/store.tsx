import { configureStore } from '@reduxjs/toolkit';
import timerSlice from './slices';
import asyncDispatchMiddleware from './middleware/asyncDispatchMiddleware';

const store = configureStore({
  reducer: {
    timer: timerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(asyncDispatchMiddleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
