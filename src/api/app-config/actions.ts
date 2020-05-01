/** Third-party dependencies */
import { createAction } from '@reduxjs/toolkit';

/** Our code */
import { AppConfigState } from './types';

export const setAppConfig = createAction(
  'app-config/SET',
  (appConfig: AppConfigState) => ({
    payload: appConfig,
  }),
);
