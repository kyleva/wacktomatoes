import { COUNTDOWN_TYPES, UI_STATES } from '../api/pomodoro/constants';

const COUNTDOWN_CONFIG = new Map();

COUNTDOWN_CONFIG.set(COUNTDOWN_TYPES.BREAK, {
  completedState: UI_STATES.INITIAL,
});

COUNTDOWN_CONFIG.set(COUNTDOWN_TYPES.POMODORO, {
  completedState: UI_STATES.FORM,
});

export default COUNTDOWN_CONFIG;
