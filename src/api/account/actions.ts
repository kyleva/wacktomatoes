import { createAction } from '@reduxjs/toolkit';

export const loginFetchComplete = createAction(
  'account/FETCH_LOGIN_COMPLETED',
  ({ data, error }: { data: object; error: boolean }) => ({
    error,
    payload: error || data,
  }),
);

export const loginFetchStart = createAction(
  'account/FETCH_LOGIN_STARTED',
  ({ email, password }) => ({ payload: { email, password } }),
);

export const logoutStart = createAction('account/LOGOUT_STARTED');

export const logoutComplete = createAction('account/LOGOUT_COMPLETED');

export const registerComplete = createAction(
  'account/REGISTER_FETCH_COMPLETED',
  ({ data, error }: { data: object; error: boolean }) => ({
    error,
    payload: error || data,
  }),
);

export const registerStart = createAction(
  'account/REGISTER_FETCH_STARTED',
  ({ email, password }) => ({ payload: { email, password } }),
);

export const resetPasswordComplete = createAction(
  'account/RESET_PASSWORD_FETCH_COMPLETED',
  ({ data, error }: { data: object; error: boolean }) => ({
    error,
    payload: error || data,
  }),
);

export const resetPasswordStart = createAction(
  'account/RESET_PASSWORD_FETCH_STARTED',
  ({ newPassword, oldPassword }) => ({ payload: { newPassword, oldPassword } }),
);
