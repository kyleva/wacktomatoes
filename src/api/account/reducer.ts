/** Third-party libraries */
import { createReducer } from '@reduxjs/toolkit';

/** Our code */
// Actions
import { appStartComplete } from '../lifecycle/actions';
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
  email: null,
  status: STATUSES.EMPTY,
  token: null,
};

const account = createReducer(initialState, {
  [appStartComplete.type]: (state, action) => {
    const data = action.payload.data || {};
    const { email, token } = data;

    state.email = email;
    state.status = STATUSES.READY;
    state.token = token;
  },

  [loginFetchStart.type]: (state) => {
    state.status = STATUSES.BUSY;
  },

  [loginFetchComplete.type]: (state, action) => {
    if (action.error) {
      state.status = STATUSES.ERROR;
      return;
    }

    const { email, token } = action.payload;

    state.email = email;
    state.status = STATUSES.READY;
    state.token = token;
  },

  [registerComplete.type]: (state, action) => {
    if (action.error) return;

    const { email, token } = action.payload;

    state.email = email;
    state.status = STATUSES.READY;
    state.token = token;
  },
});

export default account;
