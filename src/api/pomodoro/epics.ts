/** Third party libraries */
import { Epic, ofType } from 'redux-observable';
import { race, timer } from 'rxjs';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

/** Our code */
import { cancelCountdown, completeCountdown, startCountdown } from './actions';
import COUNTDOWN_CONFIG from '../../configs/countdown';
import { selectPomodoro } from './selectors';

export const countdownEpic: Epic = (action$, state$) => {
  const countdownCancelled$ = action$.pipe(ofType(cancelCountdown.type));

  return action$.pipe(
    ofType(startCountdown.type),
    withLatestFrom(state$),
    switchMap(([, state]: [any, any]) => {
      const countdownDuration = selectPomodoro(state).duration;
      const countdownTimer$ = timer(countdownDuration).pipe(
        tap(() => console.log('i emit it!')),
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

// const getTimeRemaining = state => {
//   const { duration, timeInitiated } = selectPomodoro(state);
//   const timeSinceInitiated = Date.now() - timeInitiated;
//   const timeRemaining = duration - timeSinceInitiated;

//   return timeRemaining;
// };

// const isTimeRemaining = ([action, state]: [any, any]) => {
//   const timeRemaining = getTimeRemaining(state);

//   return timeRemaining > 0;
// };

export default {
  countdownEpic,
};
