/** Third party libraries */
import React from 'react';
import { Dispatch } from 'redux';

/** Our code */
import { COUNTDOWN } from '../../api/pomodoro/constants';
import { startCountdown } from '../../api/pomodoro/actions';

interface PomodoroProps {
  dispatch: Dispatch;
}

const Pomodoro = ({ dispatch }: PomodoroProps) => (
  <>
    <button
      onClick={() =>
        dispatch(
          startCountdown({ duration: 0.25, countdownType: COUNTDOWN.POMODORO }),
        )
      }
    >
      Start Pomodoro
    </button>
  </>
);

export default Pomodoro;
