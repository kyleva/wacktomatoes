import { Epic } from 'redux-observable';
import { filter, ignoreElements, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { push } from 'connected-react-router';

import { requestRoute } from './actions';

export const requestRouteEpic: Epic = (action$) =>
  action$.pipe(
    filter(requestRoute.match),
    mergeMap((action) => {
      const { path } = action.payload;
      return of(push(path));
    }),
  );
