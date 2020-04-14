/** Third-party libraries */
import { Epic } from 'redux-observable';
import { filter, map, mapTo, take, tap } from 'rxjs/operators';

/** Our code */
// Actions
import { appStart, appStartComplete, appHydrateComplete } from './actions';
// Helpers
import { handlePromise, makeRequest } from '../epic-helpers';

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

export const hydrateStore: Epic = (action$) =>
  action$.pipe(
    filter(appStartComplete.match),
    take(1),
    map((action) => action.payload.data.token),
    handlePromise((token) =>
      makeRequest({
        body: {
          token,
        },
        method: 'POST',
        url: 'http://localhost:3030/pomodoro/getAllForUser', // pomodoro get by user id endpoint
      }),
    ),
    tap((data) => console.log(data)),
    map(appHydrateComplete),
  );
