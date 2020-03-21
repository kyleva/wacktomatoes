// Constants
import * as STATE_SLICES from './constants/state-slices';

// Reducers
import pomodoroReducer from './pomodoro/reducer';

const reducers = {
  [STATE_SLICES.POMODORO]: pomodoroReducer,
};

export default reducers;
