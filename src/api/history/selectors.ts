/** Third-party libraries */
import { createSelector } from 'reselect';

/** Our code */
// Constants
import * as STATE_SLICES from '../constants/state-slices';
// Selector Helpers
import {
  addPomodorosToCollection,
  getDateString,
  getShortDateString,
} from './selector-helpers';
// Types
import { HistoryItem } from './types';

export interface Day {
  date: string;
  title: string;
  items: HistoryItem[];
}

export interface DailyHistory {
  datesAdded: string[];
  days: Day[];
}

const getDailyHistory = (pomodoros: HistoryItem[] = []): DailyHistory => {
  /**
   * Add history keys to new object, a la:
   * {
   *   '01/01/1969': [],
   *   '01/05/1969': [],
   *    ... etc ...
   * }
   * Each date will hold completed history items (pomodoros)
   */
  let daysWithoutHistory: object = pomodoros.reduce(
    (acc: DailyHistory, curr: HistoryItem) => {
      const pomodoroCompletedDate = new Date(curr.timeCompleted);
      const pomodoroStartedDate = new Date(curr.timeInitiated);
      const shortDateCompletedString = getShortDateString(
        pomodoroCompletedDate,
      );

      if (acc.datesAdded && acc.datesAdded.includes(shortDateCompletedString))
        return acc;

      const dateCompletedString = getDateString(pomodoroStartedDate);

      return {
        ...acc,
        datesAdded: [...acc.datesAdded, shortDateCompletedString],
        days: [
          ...acc.days,
          {
            date: shortDateCompletedString,
            items: [],
            title: dateCompletedString,
          },
        ],
      };
    },
    { datesAdded: [], days: [] },
  );

  /**
   * Add the completed pomodoros to their respective date collections
   */
  const daysWithHistory = addPomodorosToCollection(
    pomodoros,
    daysWithoutHistory,
  );

  return daysWithHistory;
};

export const getHistoryView = createSelector(
  (state: RootState) => selectHistory(state),
  ({ items }) => ({
    history: getDailyHistory(items),
  }),
);

export const selectHistory = (state: RootState) =>
  state && state[STATE_SLICES.HISTORY];
