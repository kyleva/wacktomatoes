import * as ACTION_TYPES from './constants/action-types';

export interface Action {
  type: typeof ACTION_TYPES[keyof typeof ACTION_TYPES];
  payload?: object;
  error?: boolean;
}
