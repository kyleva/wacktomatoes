/** Third party libraries */
import React from 'react';
import { Dispatch } from 'redux';

/** Our code */
// Constants
import { COUNTDOWN_TYPES } from '../../api/pomodoro/constants';
import { startCountdown } from '../../api/pomodoro/actions';

interface PomodoroProps {
  dispatch: Dispatch;
}

const TWENTY_FIVE_MINUTES = 25 * 1000 * 60;

const Pomodoro = ({ dispatch }: PomodoroProps) => (
  <button
    onClick={() =>
      dispatch(
        startCountdown({
          duration: 20000,
          countdownType: COUNTDOWN_TYPES.POMODORO,
        }),
      )
    }
  >
    Start Pomodoro
  </button>
);

export default Pomodoro;
