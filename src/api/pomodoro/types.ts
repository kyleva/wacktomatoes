import { COUNTDOWN_TYPES, UI_STATES } from './constants';

export interface PomodoroState {
  countdownType: UnionOf<typeof COUNTDOWN_TYPES> | null;
  current: Pomodoro;
  list: Pomodoro[];
  uiState: UnionOf<typeof UI_STATES>;
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
