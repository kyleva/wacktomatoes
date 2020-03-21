import { COUNTDOWN, UI_STATES } from '../api/pomodoro/constants';

const COUNTDOWN_CONFIG = new Map();

COUNTDOWN_CONFIG.set(COUNTDOWN.BREAK, {
  completedState: UI_STATES.INITIAL,
});

COUNTDOWN_CONFIG.set(COUNTDOWN.POMODORO, {
  completedState: UI_STATES.FORM,
});

export default COUNTDOWN_CONFIG;
