import { createAction } from '@reduxjs/toolkit';

export const addPomodoroItem = createAction(
  'pomodoro/item/ADD',
  function prepare({ description }) {
    return {
      payload: {
        description,
      },
    };
  },
);

export const cancelCountdown = createAction('pomodoro/countdown/CANCEL');

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
        duration: duration * 60 * 1000, // convert ms to minutes
        timeInitiated: Date.now(),
        countdownType,
      },
    };
  },
);
