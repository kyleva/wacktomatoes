/** Third party libraries */
import { createReducer } from '@reduxjs/toolkit';

/** Our code */
// Actions
import { appHydrateComplete } from '../lifecycle/actions';
import {
  cancelCountdown,
  completeCountdown,
  startCountdown,
} from '../pomodoro/actions';
import {
  loginFetchComplete,
  logoutComplete,
  registerComplete,
} from '../account/actions';
// Constants
import { UI_STATES } from './constants';
// Types
import { UIState } from './types';

const initialState: UIState = {
  uiState: UI_STATES.INITIAL,
};

const ui = createReducer(initialState, {
  [appHydrateComplete.type]: (state) => {
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

    state.uiState = uiState;
  },

  [loginFetchComplete.type]: (
    state,
    action: ReturnType<typeof loginFetchComplete>,
  ) => {
    if (action.error) return;

    state.uiState = UI_STATES.DASHBOARD;
  },

  [logoutComplete.type]: () => {
    return initialState;
  },

  [registerComplete.type]: (state, action) => {
    if (action.error) return;

    state.uiState = UI_STATES.DASHBOARD;
  },

  [startCountdown.type]: (state, action: ReturnType<typeof startCountdown>) => {
    state.uiState = UI_STATES.COUNTDOWN;
  },
});

export default ui;
