/** Third-party libraries */
import { createReducer } from '@reduxjs/toolkit';

/** Our code */
// Actions
import { addPomodoro } from './actions';
import { HistoryState } from './types';

const initialState: HistoryState = {
  items: [],
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
