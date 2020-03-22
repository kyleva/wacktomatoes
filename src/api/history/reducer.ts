/** Third-party libraries */
import { createReducer } from '@reduxjs/toolkit';

/** Our code */
// Actions
import { addPomodoro } from './actions';
import { HistoryItem, HistoryState } from './types';

const fakeItems: HistoryItem[] = [
  {
    description: 'This is my favorite!',
    duration: 25 * 60 * 1000,
    timeCompleted: new Date('1/1/69 1:25 pm').getTime(),
    timeInitiated: new Date('1/1/69 1:00 pm').getTime(),
  },
  {
    description: 'This is my favorite!',
    duration: 25 * 60 * 1000,
    timeCompleted: new Date('1/1/69 1:56 pm').getTime(),
    timeInitiated: new Date('1/1/69 1:31 pm').getTime(),
  },
  {
    description: 'This is my favorite!',
    duration: 25 * 60 * 1000,
    timeCompleted: new Date('1/1/69 2:29 pm').getTime(),
    timeInitiated: new Date('1/1/69 2:04 pm').getTime(),
  },
  {
    description: 'First thing of the day!',
    duration: 25 * 60 * 1000,
    timeCompleted: new Date('1/2/69 2:29 pm').getTime(),
    timeInitiated: new Date('1/2/69 2:04 pm').getTime(),
  },
];

const initialState: HistoryState = {
  items: fakeItems,
};

const history = createReducer(initialState, {
  [addPomodoro.type]: (state, action: ReturnType<typeof addPomodoro>) => {
    const pomodoro = {
      ...action.payload,
    };

    state.items.push(pomodoro);
  },
});

export default history;
