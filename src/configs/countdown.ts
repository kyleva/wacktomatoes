import { COUNTDOWN_TYPES } from '../api/pomodoro/constants';
import { UI_STATES } from '../api/ui/constants';

const COUNTDOWN_CONFIG = new Map();

COUNTDOWN_CONFIG.set(COUNTDOWN_TYPES.BREAK, {
  completedState: UI_STATES.DASHBOARD,
});

COUNTDOWN_CONFIG.set(COUNTDOWN_TYPES.POMODORO, {
  completedState: UI_STATES.FORM,
});

export default COUNTDOWN_CONFIG;
