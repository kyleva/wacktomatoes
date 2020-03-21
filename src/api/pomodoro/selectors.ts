// Constants
import * as STATE_SLICES from '../constants/state-slices';

export const selectPomodoro = (state: any) =>
  state && state[STATE_SLICES.POMODORO];
