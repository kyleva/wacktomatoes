import { COUNTDOWN_TYPES } from './constants';
import { UI_STATES } from '../ui/constants';

export interface PomodoroState {
  countdownType: UnionOf<typeof COUNTDOWN_TYPES> | null;
  current: Pomodoro;
  list: Pomodoro[];
}

export interface Pomodoro {
  description: string;
  duration: number;
  endTime: number;
  endTimeString?: string;
  startTime: number;
  startTimeString?: string;
}

export interface SortedPomodoros {
  [key: string]: {
    title: string;
    items: Pomodoro[];
  };
}
