/** Third-party libraries */
import { createSelector } from 'reselect';

/** Our code */
// Constants
import * as STATE_SLICES from '../constants/state-slices';
import { COUNTDOWN_TYPES } from './constants';

export const getCountdownView = createSelector(
  (state: RootState) => selectPomodoro(state),
  ({ countdownType }) => ({
    isCancelButtonVisible: countdownType === COUNTDOWN_TYPES.POMODORO,
  }),
);

export const selectPomodoro = (state: RootState) =>
  state && state[STATE_SLICES.POMODORO];
