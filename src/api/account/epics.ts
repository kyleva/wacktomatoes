/** Third-party libraries */
import Cookies from 'js-cookie';
import { Epic } from 'redux-observable';
import {
  filter,
  ignoreElements,
  map,
  mapTo,
  mergeMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

/** Our code */
// Actions
import {
  loginFetchComplete,
  loginFetchStart,
  logoutComplete,
  logoutStart,
  registerComplete,
  registerStart,
  resetPasswordComplete,
  resetPasswordStart,
} from './actions';
import { requestRoute } from '../navigation/actions';
// Helpers
import { handlePromise, makeRequest } from '../epic-helpers';
// Selectors
import { selectAccount } from './selectors';

export const logoutEpic: Epic = (action$, state$, { cookies }) =>
  action$.pipe(
    filter(logoutStart.match),
    tap(() => Cookies.remove('token', { path: '/' })),
    mapTo(logoutComplete()),
  );

export const resetPasswordEpic: Epic = (action$, state$) =>
  action$.pipe(
    filter(resetPasswordStart.match),
    withLatestFrom(state$),
    map(([action, state]) => ({
      newPassword: action.payload.newPassword,
      oldPassword: action.payload.oldPassword,
      token: selectAccount(state).token,
    })),
    handlePromise(({ newPassword, oldPassword, token }) =>
      makeRequest({
        body: {
          newPassword,
          oldPassword,
        },
        method: 'POST',
        token,
        url: 'http://localhost:3030/user/reset-password',
      }),
    ),
    map(resetPasswordComplete),
  );

export const loginEpic: Epic = (action$) =>
  action$.pipe(
    filter(loginFetchStart.match),
    map((action) => ({
      email: action.payload.email,
      password: action.payload.password,
    })),
    handlePromise(({ email, password }) => {
      return makeRequest({
        body: {
          email,
          password,
        },
        method: 'POST',
        url: 'http://localhost:3030/user/login',
      });
    }),
    map(loginFetchComplete),
  );

export const registerEpic: Epic = (action$, state$) =>
  action$.pipe(
    filter(registerStart.match),
    withLatestFrom(state$),
    map(([action, state]) => ({
      email: action.payload.email,
      password: action.payload.password,
      token: selectAccount(state).token,
    })),
    handlePromise(({ email, password, token }) =>
      makeRequest({
        body: {
          email,
          password,
          token,
        },
        method: 'POST',
        url: 'http://localhost:3030/user/create',
      }),
    ),
    mergeMap((response) => [
      requestRoute({ path: '/' }),
      registerComplete(response),
    ]),
  );

export const setTokenCookie: Epic = (action$) =>
  action$.pipe(
    filter(loginFetchComplete.match),
    filter((action) => !Boolean(action.error)),
    tap((action) => {
      Cookies.set('token', action.payload.token, {
        expires: 30 * 24 * 60 * 60 * 1000,
        path: '/',
      });
    }),
    ignoreElements(),
  );
