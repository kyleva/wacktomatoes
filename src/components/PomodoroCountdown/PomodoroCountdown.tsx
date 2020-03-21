import React from 'react';

interface PomodoroCountdownProps {
  timeInitiated: number;
}

const PomodoroCountdown = ({ timeInitiated }: PomodoroCountdownProps) => {
  return <div>This is a countdown!</div>;
};

export default PomodoroCountdown;
