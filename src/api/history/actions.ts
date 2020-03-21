import { createAction } from '@reduxjs/toolkit';

export const addPomodoro = createAction(
  'pomodoro/history/ADD',
  function prepare({ description, duration, timeCompleted, timeInitiated }) {
    return {
      payload: {
        description,
        duration,
        timeCompleted,
        timeInitiated,
      },
    };
  },
);
