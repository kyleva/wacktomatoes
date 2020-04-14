/** Third party libraries */
import { createReducer } from '@reduxjs/toolkit';

/** Our code */
// Action creators
import {
  addPomodoro,
  cancelCountdown,
  completeCountdown,
  startCountdown,
} from './actions';
import { appHydrateComplete } from '../lifecycle/actions';
import { logoutComplete } from '../account/actions';
// Types
import { Pomodoro, PomodoroState } from './types';

const initialState: PomodoroState = {
  countdownType: null,
  current: {
    description: null,
    duration: null,
    endTime: null,
    startTime: null,
  },
  list: [],
};

const pomodoro = createReducer(initialState, {
  [addPomodoro.type]: (state, action: ReturnType<typeof addPomodoro>) => {
    state.current.description = action.payload.description;

    const pomodoro: Pomodoro = {
      description: action.payload.description,
      duration: state.current.duration,
      endTime: state.current.endTime,
      startTime: state.current.startTime,
    };

    state.list.push(pomodoro);
  },

  [appHydrateComplete.type]: (
    state,
    action: ReturnType<typeof appHydrateComplete>,
  ) => {
    const pomodoros = action.payload.data || [];

    state.list = pomodoros;
  },

  [cancelCountdown.type]: () => {
    return initialState;
  },

  [completeCountdown.type]: (state) => {
    state.countdownType = null;
    state.current.description = '';
    state.current.duration = null;
    state.current.endTime = Date.now();
  },

  [logoutComplete.type]: () => {
    return initialState;
  },

  [startCountdown.type]: (state, action: ReturnType<typeof startCountdown>) => {
    const { countdownType, duration } = action.payload;

    state.countdownType = countdownType;
    state.current.duration = duration;
    state.current.startTime = Date.now();
  },
});

export default pomodoro;
