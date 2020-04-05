/** Third-party libraries */
import { createReducer } from '@reduxjs/toolkit';

/** Our code */
// Actions
import {
  loginFetchComplete,
  loginFetchStart,
  registerComplete,
} from './actions';
// Constants
import * as STATUSES from '../constants/statuses';
// Types
import { AccountState } from './types';

const initialState: AccountState = {
  status: STATUSES.EMPTY,
  token: null,
};

const account = createReducer(initialState, {
  [loginFetchStart.type]: (state) => {
    state.status = STATUSES.BUSY;
  },

  [loginFetchComplete.type]: (state, action) => {
    if (action.error) {
      state.status = STATUSES.ERROR;
      return;
    }

    state.status = STATUSES.READY;
    state.token = action.payload.token;
  },

  [registerComplete.type]: (state, action) => {
    if (action.error) return;

    state.status = STATUSES.READY;
    state.token = action.payload.token;
  },
});

export default account;
