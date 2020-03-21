/** Third party libraries */
import { createReducer } from '@reduxjs/toolkit';

/** Our code */
// Action creators
import { cancelCountdown, completeCountdown, startCountdown } from './actions';
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
  [cancelCountdown.type]: state => {
    state.countdownType = null;
    state.uiState = UI_STATES.INITIAL;
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

  [startCountdown.type]: (state, action: ReturnType<typeof startCountdown>) => {
    const { duration, timeInitiated, countdownType } = action.payload;

    state.duration = duration;
    state.timeInitiated = timeInitiated;
    state.countdownType = countdownType;
    state.uiState = UI_STATES.COUNTDOWN;
  },
});

export default pomodoro;
