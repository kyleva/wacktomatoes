/** Third-party libraries */
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Observable, from, of, pipe } from 'rxjs';

/**
 * @todo Automatically add token using handlePromise operator
 */
export const makeRequest = ({
  body,
  method,
  token,
  url,
}: {
  body?: any;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  token?: string;
  url: string;
}) =>
  ajax({
    body,
    headers: {
      'Content-Type': 'application/json',
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    },
    method,
    url,
  });

export const handlePromise = (
  promiseFunction: (args: any) => Observable<AjaxResponse>,
) =>
  pipe(
    mergeMap((args) =>
      from(promiseFunction(args)).pipe(
        map(({ response }) => response),
        catchError(({ response }) => of(response)),
      ),
    ),
  );
