import { COUNTDOWN, UI_STATES } from './constants';

export interface PomodoroState {
  countdownType: UnionOf<typeof COUNTDOWN> | null;
  description: string | null;
  duration: number | null;
  timeCompleted: number | null;
  timeInitiated: number | null;
  uiState: UnionOf<typeof UI_STATES>;
}
