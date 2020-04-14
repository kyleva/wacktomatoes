/** Third-party dependencies */
import { createAction } from '@reduxjs/toolkit';

/** Our code */
export const appStart = createAction('lifecycle/START');

export const appStartComplete = createAction(
  'lifecycle/START_COMPLETED',
  ({ data }) => ({
    payload: {
      data,
    },
  }),
);

export const appHydrateComplete = createAction(
  'lifecycle/APP_HYDRATE_COMPLETED',
  ({ data, error }: { data: any; error: any }) => {
    return {
      error: Boolean(error),
      payload: error || {
        data,
      },
    };
  },
);
