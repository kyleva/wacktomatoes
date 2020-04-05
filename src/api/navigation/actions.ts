import { createAction } from '@reduxjs/toolkit';

export const requestRoute = createAction(
  'navigation/REQUEST_ROUTE',
  ({ path }) => ({
    payload: {
      path: path,
    },
  }),
);
