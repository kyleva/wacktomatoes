/** Third-party libraries */
import { Epic, ofType } from 'redux-observable';
import { filter, map, take, withLatestFrom } from 'rxjs/operators';

/** Our code */
// Actions
import { appStart, appStartComplete, appHydrateComplete } from './actions';
import { loginFetchComplete } from '../account/actions';
// Helpers
import { handlePromise, makeRequest } from '../epic-helpers';
// Selectors
import { selectAccount } from '../account/selectors';

export const appLifecycleStart: Epic = (action$, state$, { cookies }) =>
  action$.pipe(
    filter(appStart.match),
    take(1),
    map(() => cookies.get('token')),
    filter((tokenExists) => Boolean(tokenExists)),
    handlePromise((token) => {
      return makeRequest({
        body: {
          token,
        },
        method: 'POST',
        url: 'http://localhost:3030/user/verify', // token validation endpoint
      });
    }),
    filter((response: any) => !Boolean(response.error)),
    map(appStartComplete),
  );

export const hydrateStore: Epic = (action$, state$) =>
  action$.pipe(
    ofType(appStartComplete.type, loginFetchComplete.type),
    filter((action) => !Boolean(action.error)),
    withLatestFrom(state$),
    map(([, state]) => selectAccount(state)),
    handlePromise(({ token }) =>
      makeRequest({
        body: {
          token,
        },
        method: 'POST',
        url: 'http://localhost:3030/pomodoro/getAllForUser', // pomodoro get by user id endpoint
      }),
    ),
    map(appHydrateComplete),
  );
