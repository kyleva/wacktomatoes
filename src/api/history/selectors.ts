/** Third-party libraries */
import { createSelector } from 'reselect';

/** Our code */
// Constants
import * as STATE_SLICES from '../constants/state-slices';

const getDailyHistory = (items: any) => {
  const history = [...items];
  // loop through history items and make unique date arrays
  // loop through history items again and add them into the above
};

export const getHistoryView = createSelector(
  state => selectHistory(state),
  ({ items }) => ({
    history: getDailyHistory(items),
  }),
);

export const selectHistory = (state: any) =>
  state && state[STATE_SLICES.HISTORY];
