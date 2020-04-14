import * as STATE_SLICES from '../constants/state-slices';

export const selectUI = (state: RootState) => state && state[STATE_SLICES.UI];
