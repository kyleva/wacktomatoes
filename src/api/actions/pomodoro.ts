import {
  POMODORO_COMPLETED,
  POMODORO_PAUSED,
  POMODORO_STARTED
} from '../constants/action-types';

export function completePomodoro() {
  return { type: POMODORO_COMPLETED };
}

export function pausePomodoro() {
  return { type: POMODORO_PAUSED };
}

export function startPomodoro() {
  return { type: POMODORO_STARTED };
}
