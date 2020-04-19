/** Third party libraries */
import { Epic, ofType } from 'redux-observable';
import { race, timer } from 'rxjs';
import {
  filter,
  ignoreElements,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';

/** Our code */
// Actions
import {
  addPomodoro,
  addPomodoroComplete,
  cancelCountdown,
  completeCountdown,
  startCountdown,
} from './actions';
// Configs
import COUNTDOWN_CONFIG from '../../configs/countdown';
// Helpers
import { handlePromise, makeRequest } from '../epic-helpers';
// Selectors
import { selectAccount } from '../account/selectors';
import { selectPomodoro } from './selectors';

export const addPomodoroEpic: Epic = (action$, state$) =>
  action$.pipe(
    filter(addPomodoro.match),
    withLatestFrom(state$),
    map(([action, state]) => ({
      ...selectPomodoro(state),
      token: selectAccount(state).token,
    })),
    handlePromise(({ current, token }) =>
      makeRequest({
        body: {
          description: current.description,
          endTime: current.endTime,
          startTime: current.startTime,
        },
        method: 'POST',
        token,
        url: 'http://localhost:3030/pomodoro/create',
      }),
    ),
    map(addPomodoroComplete),
  );

export const countdownEpic: Epic = (action$, state$) => {
  const countdownCancelled$ = action$.pipe(
    filter(cancelCountdown.match),
    ignoreElements(),
  );

  return action$.pipe(
    ofType(startCountdown.type),
    withLatestFrom(state$),
    switchMap(([, state]: [any, any]) => {
      const countdownDuration = selectPomodoro(state).current.duration;
      const countdownTimer$ = timer(countdownDuration).pipe(
        withLatestFrom(state$),
        map(([, state]: [any, any]) => {
          const { countdownType } = selectPomodoro(state);
          const completedState = COUNTDOWN_CONFIG.get(countdownType)
            .completedState;

          return completedState;
        }),
        map((completedState) => completeCountdown({ uiState: completedState })),
      );

      return race(countdownCancelled$, countdownTimer$);
    }),
  );
};

export default {
  countdownEpic,
};
