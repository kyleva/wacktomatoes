/** Third party libraries */
import { Epic, ofType } from 'redux-observable';
import { race, timer } from 'rxjs';
import { ignoreElements, map, switchMap, withLatestFrom } from 'rxjs/operators';

/** Our code */
import { cancelCountdown, completeCountdown, startCountdown } from './actions';
import COUNTDOWN_CONFIG from '../../configs/countdown';
import { selectPomodoro } from './selectors';

export const countdownEpic: Epic = (action$, state$) => {
  const countdownCancelled$ = action$.pipe(
    ofType(cancelCountdown.type),
    ignoreElements(),
  );

  return action$.pipe(
    ofType(startCountdown.type),
    withLatestFrom(state$),
    switchMap(([, state]: [any, any]) => {
      const countdownDuration = selectPomodoro(state).duration;
      const countdownTimer$ = timer(countdownDuration).pipe(
        withLatestFrom(state$),
        map(([, state]: [any, any]) => {
          const { countdownType } = selectPomodoro(state);
          const completedState = COUNTDOWN_CONFIG.get(countdownType)
            .completedState;

          return completedState;
        }),
        map(completedState => completeCountdown({ uiState: completedState })),
      );

      return race(countdownCancelled$, countdownTimer$);
    }),
  );
};

export default {
  countdownEpic,
};
