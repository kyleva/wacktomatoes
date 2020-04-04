import * as STATE_SLICES from '../constants/state-slices';

export const selectAccount = (state: RootState) =>
  state && state[STATE_SLICES.ACCOUNT];
