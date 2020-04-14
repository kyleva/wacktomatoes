import { createAction } from '@reduxjs/toolkit';

export const addPomodoro = createAction(
  'pomodoro/history/ADD',
  function prepare({ description }) {
    return {
      payload: {
        description,
      },
    };
  },
);

export const addPomodoroComplete = createAction(
  'pomodoro/history/ADD_COMPLETED',
  ({ data, error }: { data: object; error: boolean }) => ({
    error,
    payload: error || data,
  }),
);

export const cancelCountdown = createAction('pomodoro/countdown/CANCELLED');

export const completeCountdown = createAction(
  'pomodomoro/countdown/COMPLETED',
  function prepare({ uiState }) {
    return {
      payload: {
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
        countdownType,
      },
    };
  },
);
