/** Third party libraries */
import { Epic, ofType } from 'redux-observable';
import { race, timer } from 'rxjs';
import {
  filter,
  first,
  ignoreElements,
  map,
  switchMap,
  tap,
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
// Sounds
import alarmSound from '../../assets/audio/alarm-bell.mp3';

let countdownCompletedSound: HTMLAudioElement | undefined;

export const addPomodoroEpic: Epic = (action$, state$, { endpoints }) =>
  action$.pipe(
    filter(addPomodoro.match),
    withLatestFrom(state$),
    map(([, state]) => ({
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
        url: endpoints.POMODORO_CREATE,
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

export const loadAudioCountdownStartEpic: Epic = (action$) =>
  action$.pipe(
    filter(startCountdown.match),
    first(),
    tap(() => {
      countdownCompletedSound = new Audio(alarmSound);
    }),
    ignoreElements(),
  );

export const playAudioCountdownCompleteEpic: Epic = (action$) =>
  action$.pipe(
    filter(completeCountdown.match),
    tap(() => countdownCompletedSound.play()),
    ignoreElements(),
  );

export default {
  addPomodoroEpic,
  countdownEpic,
  loadAudioCountdownStartEpic,
  playAudioCountdownCompleteEpic,
};
