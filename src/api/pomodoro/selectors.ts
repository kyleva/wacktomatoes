/** Third-party libraries */
import { createSelector } from 'reselect';

/** Our code */
// Configs
import COUNTDOWN_CONFIG from '../../configs/countdown';
// Constants
import * as STATE_SLICES from '../constants/state-slices';
import { COUNTDOWN_TYPES } from './constants';

export const getCountdownView = createSelector(
  state => selectPomodoro(state),
  ({ countdownType }) => ({
    isCancelButtonVisible: countdownType === COUNTDOWN_TYPES.POMODORO,
  }),
);

export const selectPomodoro = (state: any) =>
  state && state[STATE_SLICES.POMODORO];
