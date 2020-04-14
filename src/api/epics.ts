import * as accountEpics from './account/epics';
import * as lifecycleEpics from './lifecycle/epics';
import * as pomodoroEpics from './pomodoro/epics';
import { requestRouteEpic as requestRoute } from './navigation/epics';

export default [
  /** Account */
  accountEpics.loginEpic,
  accountEpics.logoutEpic,
  accountEpics.registerEpic,
  accountEpics.setTokenCookie,

  /** Lifecycle */
  lifecycleEpics.appLifecycleStart,
  lifecycleEpics.hydrateStore,

  /** Countdown */
  pomodoroEpics.countdownEpic,
  pomodoroEpics.addPomodoroEpic,

  /** Navigation */
  requestRoute,
];
