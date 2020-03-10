import { combineReducers } from 'redux';

import { Action } from '../api';
import {
  POMODORO_COMPLETED,
  POMODORO_STARTED
} from '../constants/action-types';

function isFormVisible(state = false, action: Action) {
  switch (action.type) {
    case POMODORO_COMPLETED:
      true;

    default:
      return state;
  }
}

function isPomodoroInProgress(state = false, action: Action) {
  switch (action.type) {
    case POMODORO_STARTED:
      return true;

    default:
      return state;
  }
}

function pomodoroStartTime(state = 0, action: Action) {
  switch (action.type) {
    case POMODORO_COMPLETED:
      return 0;

    case POMODORO_STARTED:
      return Date.now();

    default:
      return state;
  }
}

const reducer = combineReducers({
  isFormVisible,
  isPomodoroInProgress,
  pomodoroStartTime
});

export type PomodoroState = ReturnType<typeof reducer>;

export default reducer;
