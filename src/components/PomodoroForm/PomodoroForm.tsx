/** Third-party libraries */
import React, { useState } from 'react';
import { Dispatch } from 'redux';

/** Our code */
// Actions
import { addPomodoro } from '../../api/history/actions';
import { cancelCountdown, startCountdown } from '../../api/pomodoro/actions';
// Constants
import { COUNTDOWN_TYPES } from '../../api/pomodoro/constants';

interface PomodoroCountdownProps {
  dispatch: Dispatch;
  duration: number;
  timeCompleted: number;
  timeInitiated: number;
}

const FIVE_MINUTES = 5 * 1000 * 60;

const PomodoroCountdown = ({
  dispatch,
  duration,
  timeCompleted,
  timeInitiated,
}: PomodoroCountdownProps) => {
  const [description, setDescription] = useState('');

  return (
    <div>
      What did you do?
      <input type="text" onChange={e => setDescription(e.target.value)}></input>
      <button
        onClick={() => {
          dispatch(
            addPomodoro({
              description,
              duration,
              timeCompleted,
              timeInitiated,
            }),
          );
          dispatch(
            startCountdown({
              countdownType: COUNTDOWN_TYPES.BREAK,
              duration: 5000,
            }),
          );
        }}
        value={description}
      >
        submit
      </button>
      <button onClick={() => dispatch(cancelCountdown())}>cancel</button>
    </div>
  );
};

export default PomodoroCountdown;
