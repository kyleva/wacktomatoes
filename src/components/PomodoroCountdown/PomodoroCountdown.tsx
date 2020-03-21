/* Third-party libraries */
import React, { useState } from 'react';

/* Our code */
// Hooks
import useInterval from '../../hooks/use-interval';
// Modules
import getCountdownText from '../../modules/get-countdown-text';

interface PomodoroCountdownProps {
  duration: number;
  timeInitiated: number;
}

const PomodoroCountdown = ({
  duration,
  timeInitiated,
}: PomodoroCountdownProps) => {
  const initialCountdownText = getCountdownText({ duration, timeInitiated });
  const [countdownText, setCountdownText] = useState(initialCountdownText);

  useInterval(() => {
    setCountdownText(getCountdownText({ duration, timeInitiated }));
  }, 1000);

  return <div>{countdownText}</div>;
};

export default PomodoroCountdown;
