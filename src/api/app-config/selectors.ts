import * as STATE_SLICES from '../constants/state-slices';

export const selectAppConfig = (state: RootState) =>
  state && state[STATE_SLICES.APP_CONFIG];

export const selectEndpoints = (state: RootState) =>
  state && selectAppConfig(state).endpoints;
