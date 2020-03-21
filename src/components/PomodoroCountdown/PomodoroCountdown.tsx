/* Third-party libraries */
import React, { useState } from 'react';
import { Dispatch } from 'redux';

/* Our code */
// Actions
import { cancelCountdown } from '../../api/pomodoro/actions';
// Hooks
import useInterval from '../../hooks/use-interval';
// Modules
import getCountdownText from '../../modules/get-countdown-text';

interface PomodoroCountdownProps {
  dispatch: Dispatch;
  duration: number;
  isCancelButtonVisible: boolean;
  timeInitiated: number;
}

const PomodoroCountdown = ({
  dispatch,
  duration,
  isCancelButtonVisible = false,
  timeInitiated,
}: PomodoroCountdownProps) => {
  const initialCountdownText = getCountdownText({ duration, timeInitiated });
  const [countdownText, setCountdownText] = useState(initialCountdownText);

  useInterval(() => {
    setCountdownText(getCountdownText({ duration, timeInitiated }));
  }, 1000);

  return (
    <>
      <div>{countdownText}</div>

      {isCancelButtonVisible && (
        <div>
          <button onClick={() => dispatch(cancelCountdown())}>cancel</button>
        </div>
      )}
    </>
  );
};

export default PomodoroCountdown;
