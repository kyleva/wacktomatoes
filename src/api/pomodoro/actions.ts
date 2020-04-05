import { createAction } from '@reduxjs/toolkit';

export const completeCountdown = createAction(
  'pomodomoro/countdown/COMPLETED',
  function prepare({ uiState }) {
    return {
      payload: {
        timeCompleted: Date.now(),
        uiState,
      },
    };
  },
);

export const startCountdown = createAction(
  'pomodoro/countdown/STARTED',
  function prepare({ duration, countdownType }) {
    return {
      payload: {
        duration: duration, // convert ms to minutes
        timeInitiated: Date.now(),
        countdownType,
      },
    };
  },
);
