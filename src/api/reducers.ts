// Constants
import * as STATE_SLICES from './constants/state-slices';
// Reducers
import accountReducer from './account/reducer';
import pomodoroReducer from './pomodoro/reducer';

const reducers = {
  [STATE_SLICES.ACCOUNT]: accountReducer,
  [STATE_SLICES.POMODORO]: pomodoroReducer,
};

export default reducers;
