import * as accountEpics from './account/epics';
import { countdownEpic as countdown } from './pomodoro/epics';
import { requestRouteEpic as requestRoute } from './navigation/epics';

export default [
  /** Account */
  accountEpics.loginEpic,
  accountEpics.registerEpic,
  accountEpics.setTokenCookie,

  /** Countdown */
  countdown,

  /** Navigation */
  requestRoute,
];
