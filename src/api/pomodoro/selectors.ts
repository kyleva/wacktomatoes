/** Third-party libraries */
import { createSelector } from 'reselect';

/** Our code */
// Constants
import * as STATE_SLICES from '../constants/state-slices';
import { COUNTDOWN_TYPES } from './constants';
// Types
import { SortedPomodoros } from './types';

export const getCountdownView = createSelector(
  (state: RootState) => selectPomodoro(state),
  ({ countdownType }) => ({
    isCancelButtonVisible: countdownType === COUNTDOWN_TYPES.POMODORO,
  }),
);

export const getPomodorosByDay = createSelector(
  (state: RootState) => selectPomodoro(state),
  ({ list = [] }): SortedPomodoros => {
    const listDateDescending = list.slice().sort((a, b) => {
      const aDate = new Date(a.startTime).getTime();
      const bDate = new Date(b.startTime).getTime();

      return bDate - aDate;
    });

    return listDateDescending.reduce((dates: any = {}, pomodoro) => {
      const endDate = new Date(pomodoro.endTime);
      const startDate = new Date(pomodoro.startTime);
      const shortDateString = getShortDateString(startDate);

      if (!dates[shortDateString]) {
        dates[shortDateString] = {};
        dates[shortDateString].items = [];
        dates[shortDateString].title = getDateString(startDate);
      }

      dates[shortDateString].items.push({
        description: pomodoro.description,
        endTimeString: getTimeString(endDate),
        startTime: pomodoro.startTime,
        startTimeString: getTimeString(startDate),
      });

      return dates;
    }, {});
  },
);

/** Selector helpers */
const getShortDateString = (date: Date): string => {
  const shortDateString = date.toLocaleString('default', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return shortDateString;
};

const getDateString = (date: Date): string => {
  const dayNumber = date.toLocaleString('default', { day: '2-digit' });
  const day = date.toLocaleString('default', { weekday: 'long' });
  const month = date.toLocaleString('default', { month: 'long' });

  const dateCompletedString = `${day}, ${month} ${dayNumber}`;

  return dateCompletedString;
};

const getTimeString = (date: Date): string =>
  date
    .toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' })
    .toLowerCase()
    .replace(' ', '');

export const selectPomodoro = (state: RootState) =>
  state && state[STATE_SLICES.POMODORO];
