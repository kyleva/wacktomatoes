/** Third party libraries */
import React from 'react';
import { Dispatch } from 'redux';

/** Our code */
// Constants
import { COUNTDOWN } from '../../api/pomodoro/constants';
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
          duration: 5000,
          countdownType: COUNTDOWN.POMODORO,
        }),
      )
    }
  >
    Start Pomodoro
  </button>
);

export default Pomodoro;
