/** Third party libraries */
import { createReducer } from '@reduxjs/toolkit';

/** Our code */
// Action creators
import {
  addPomodoro,
  addPomodoroComplete,
  cancelCountdown,
  completeCountdown,
  startCountdown,
} from './actions';
import { appHydrateComplete } from '../lifecycle/actions';
import { loginFetchComplete, registerComplete } from '../account/actions';
// Constants
import { UI_STATES } from './constants';
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
  uiState: UI_STATES.INITIAL,
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

  [addPomodoroComplete.type]: (state) => {},

  [appHydrateComplete.type]: (state, action) => {
    const pomodoros = action.payload.data || [];

    console.log({ action });

    state.list = pomodoros;
    state.uiState = UI_STATES.DASHBOARD;
  },

  [cancelCountdown.type]: () => {
    return initialState;
  },

  [completeCountdown.type]: (
    state,
    action: ReturnType<typeof completeCountdown>,
  ) => {
    const { uiState } = action.payload;

    state.countdownType = null;
    state.current.description = '';
    state.current.duration = null;
    state.current.endTime = Date.now();
    state.uiState = uiState;
  },

  [loginFetchComplete.type]: (
    state,
    action: ReturnType<typeof loginFetchComplete>,
  ) => {
    if (action.error) return;

    state.uiState = UI_STATES.DASHBOARD;
  },

  [registerComplete.type]: (state, action) => {
    if (action.error) return;

    state.uiState = UI_STATES.DASHBOARD;
  },

  [startCountdown.type]: (state, action: ReturnType<typeof startCountdown>) => {
    const { countdownType, duration } = action.payload;

    state.countdownType = countdownType;
    state.current.duration = duration;
    state.current.startTime = Date.now();
    state.uiState = UI_STATES.COUNTDOWN;
  },
});

export default pomodoro;
