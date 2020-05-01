// Constants
import * as STATE_SLICES from './constants/state-slices';
// Reducers
import accountReducer from './account/reducer';
import appConfigReducer from './app-config/reducer';
import pomodoroReducer from './pomodoro/reducer';
import uiReducer from './ui/reducer';

const reducers = {
  [STATE_SLICES.ACCOUNT]: accountReducer,
  [STATE_SLICES.APP_CONFIG]: appConfigReducer,
  [STATE_SLICES.POMODORO]: pomodoroReducer,
  [STATE_SLICES.UI]: uiReducer,
};

export default reducers;
