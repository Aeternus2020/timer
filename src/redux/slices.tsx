import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    timers: [] as { 'N%': number }[],
    isTimerRunning: false,
    timersQueue: [] as number[],
    timerEndTimes: [] as string[],
  },
  reducers: {
    addTimer(state, action: PayloadAction<number>) {
      state.timers.push({ 'N%': action.payload });
    },
    clearTimers(state) {
      state.timers = [];
    },
    setTimerRunning(state, action: PayloadAction<boolean>) {
      state.isTimerRunning = action.payload;
    },
    addTimerToQueue(state, action: PayloadAction<number>) {
      state.timersQueue.push(action.payload);
    },
    removeFirstTimerFromQueue(state) {
      state.timersQueue.shift();
    },
    addTimerEndTime(state, action: PayloadAction<string>) {
        state.timerEndTimes.push(action.payload);
      },
  },
});

export default timerSlice.reducer;
export const {
  addTimer,
  clearTimers,
  setTimerRunning,
  addTimerToQueue,
  removeFirstTimerFromQueue,
  addTimerEndTime,
} = timerSlice.actions;
