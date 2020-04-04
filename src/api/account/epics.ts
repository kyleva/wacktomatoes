/** Third-party libraries */
import { ajax, AjaxResponse } from 'rxjs/ajax';
import {
  catchError,
  filter,
  ignoreElements,
  map,
  mergeMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import Cookies from 'js-cookie';
import { Epic } from 'redux-observable';
import { Observable, from, of, pipe } from 'rxjs';

/** Our code */
// Actions
import {
  loginFetchComplete,
  loginFetchStart,
  registerFetchComplete,
  registerFetchStart,
  resetPasswordComplete,
  resetPasswordStart,
} from './actions';
// Selectors
import { selectAccount } from './selectors';

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

export const loginEpic: Epic = action$ =>
  action$.pipe(
    filter(loginFetchStart.match),
    map(action => ({
      email: action.payload.email,
      password: action.payload.password,
    })),
    handlePromise(({ email, password }) =>
      makeRequest({
        body: {
          email,
          password,
        },
        method: 'POST',
        url: 'http://localhost:3030/user/login',
      }),
    ),
    map(loginFetchComplete),
  );

export const registerEpic: Epic = (action$, state$) =>
  action$.pipe(
    filter(registerFetchStart.match),
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
        url: 'http://localhost:3030/user/register',
      }),
    ),
    map(registerFetchComplete),
  );

export const setTokenCookie: Epic = action$ =>
  action$.pipe(
    filter(loginFetchComplete.match),
    filter(action => !Boolean(action.error)),
    tap(action => {
      Cookies.set('token', action.payload.token);
    }),
    ignoreElements(),
  );

/**
 * @todo Automatically add token using handlePromise operator
 */
const makeRequest = ({
  body,
  method,
  token,
  url,
}: {
  body: any;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  token?: string;
  url: string;
}) =>
  ajax({
    body,
    headers: {
      'Content-Type': 'application/json',
    },
    method,
    url,
  });

const handlePromise = (
  promiseFunction: (args: any) => Observable<AjaxResponse>,
) =>
  pipe(
    mergeMap((args: object) => from(promiseFunction(args))),
    mergeMap(({ response }) => of(response)),
    catchError(({ response }) => of(response)),
  );
