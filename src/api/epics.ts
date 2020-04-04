import * as accountEpics from './account/epics';
import { countdownEpic as countdown } from './pomodoro/epics';

export default [
  /** Account */
  accountEpics.loginEpic,
  accountEpics.registerEpic,
  accountEpics.setTokenCookie,

  /** Countdown */
  countdown,
];
