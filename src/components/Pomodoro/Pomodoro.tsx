import React from 'react';

/**
 * - isCountdownInProgress
 * - isSecondsVisible
 * - timeRemaining (ms)
 */

interface Props {
  countdownText?: string;
  isPomodoroInProgress?: boolean;
}

const Pomodoro = ({ countdownText, isPomodoroInProgress = false }: Props) => (
  <>
    <div className="countdown-text">
      {isPomodoroInProgress && countdownText}
    </div>

    {!isPomodoroInProgress && <button>Start Pomodoro</button>}
  </>
);

export default Pomodoro;
