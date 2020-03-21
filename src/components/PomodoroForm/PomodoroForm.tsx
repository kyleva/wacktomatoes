import React, { useState } from 'react';
import { Dispatch } from 'redux';

import { addPomodoroItem, startCountdown } from '../../api/pomodoro/actions';
import { COUNTDOWN } from '../../api/pomodoro/constants';

interface PomodoroCountdownProps {
  dispatch: Dispatch;
}

const PomodoroCountdown = ({ dispatch }: PomodoroCountdownProps) => {
  const [description, setDescription] = useState('');

  return (
    <div>
      What did you do?
      <input type="text" onChange={e => setDescription(e.target.value)}></input>
      <button
        onClick={() => {
          dispatch(addPomodoroItem({ description }));
          dispatch(
            startCountdown({
              countdownType: COUNTDOWN.BREAK,
              duration: 0.25,
            }),
          );
        }}
        value={description}
      >
        submit
      </button>
    </div>
  );
};

export default PomodoroCountdown;
