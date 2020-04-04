/** Third party libraries */
import { createReducer } from '@reduxjs/toolkit';

/** Our code */
// Action creators
import { cancelCountdown, completeCountdown, startCountdown } from './actions';
import { loginFetchComplete } from '../account/actions';
// Constants
import { UI_STATES } from './constants';
// Types
import { PomodoroState } from './types';

const initialState: PomodoroState = {
  countdownType: null,
  description: null,
  duration: null,
  timeCompleted: null,
  timeInitiated: null,
  uiState: UI_STATES.INITIAL,
};

const pomodoro = createReducer(initialState, {
  [cancelCountdown.type]: () => {
    return initialState;
  },

  [completeCountdown.type]: (
    state,
    action: ReturnType<typeof completeCountdown>,
  ) => {
    const { timeCompleted, uiState } = action.payload;

    state.countdownType = null;
    state.description = '';
    state.duration = null;
    state.timeCompleted = timeCompleted;
    state.uiState = uiState;
  },

  [loginFetchComplete.type]: (
    state,
    action: ReturnType<typeof loginFetchComplete>,
  ) => {
    if (action.error) return;

    state.uiState = UI_STATES.DASHBOARD;
  },

  [startCountdown.type]: (state, action: ReturnType<typeof startCountdown>) => {
    const { duration, timeInitiated, countdownType } = action.payload;

    state.duration = duration;
    state.timeInitiated = timeInitiated;
    state.countdownType = countdownType;
    state.uiState = UI_STATES.COUNTDOWN;
  },
});

export default pomodoro;
