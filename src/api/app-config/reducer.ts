/** Third party libraries */
import { createReducer } from '@reduxjs/toolkit';

/** Our code */
// Action creators
import { setAppConfig } from './actions';
// Types
import { AppConfigState } from './types';

const initialState: AppConfigState = {
  env: '',
};

const appConfig = createReducer(initialState, {
  [setAppConfig.type]: (state, action: ReturnType<typeof setAppConfig>) => {
    state.env = action.payload.env;
  },
});

export default appConfig;
