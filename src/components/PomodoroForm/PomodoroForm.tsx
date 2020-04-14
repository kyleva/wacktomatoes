/** Third-party libraries */
import React, { useState } from 'react';
import { Dispatch } from 'redux';

/** Our code */
// Actions
import {
  addPomodoro,
  cancelCountdown,
  startCountdown,
} from '../../api/pomodoro/actions';
// Constants
import { COUNTDOWN_TYPES } from '../../api/pomodoro/constants';

interface PomodoroCountdownProps {
  dispatch: Dispatch;
}

const PomodoroForm = ({ dispatch }: PomodoroCountdownProps) => {
  const [description, setDescription] = useState('');

  return (
    <div>
      What did you do?
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button
        onClick={() => {
          dispatch(
            addPomodoro({
              description,
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

export default PomodoroForm;
