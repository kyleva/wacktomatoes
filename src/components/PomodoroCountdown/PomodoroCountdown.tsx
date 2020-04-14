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
  startTime: number;
}

const PomodoroCountdown = ({
  dispatch,
  duration,
  isCancelButtonVisible = false,
  startTime,
}: PomodoroCountdownProps) => {
  const initialCountdownText = getCountdownText({ duration, startTime });
  const [countdownText, setCountdownText] = useState(initialCountdownText);

  useInterval(() => {
    setCountdownText(getCountdownText({ duration, startTime }));
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
