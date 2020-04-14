/** Third-party libraries */
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { catchError, mergeMap } from 'rxjs/operators';
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

export const handlePromise = (
  promiseFunction: (args: any) => Observable<AjaxResponse>,
) =>
  pipe(
    mergeMap((args: object) => from(promiseFunction(args))),
    mergeMap(({ response }) => of(response)),
    catchError(({ response }) => of(response)),
  );
