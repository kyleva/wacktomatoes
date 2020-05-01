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

export const appLifecycleStart: Epic = (
  action$,
  state$,
  { cookies, endpoints },
) =>
  action$.pipe(
    filter(appStart.match),
    take(1),
    map(() => cookies.get('token')),
    filter((tokenExists) => Boolean(tokenExists)),
    handlePromise((token) => {
      return makeRequest({
        method: 'POST',
        token,
        url: endpoints.USER_VERIFY,
      });
    }),
    filter((response: any) => !Boolean(response.error)),
    map(appStartComplete),
  );

export const hydrateStore: Epic = (action$, state$, { endpoints }) =>
  action$.pipe(
    ofType(appStartComplete.type, loginFetchComplete.type),
    filter((action) => !Boolean(action.error)),
    withLatestFrom(state$),
    map(([, state]) => selectAccount(state)),
    handlePromise(({ token }) =>
      makeRequest({
        method: 'POST',
        token,
        url: endpoints.POMODORO_GET_ALL_BY_USER,
      }),
    ),
    map(appHydrateComplete),
  );
