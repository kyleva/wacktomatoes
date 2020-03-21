import React from 'react';

// Constants
import { UI_STATES } from '../../api/pomodoro/constants';
// Containers
import Pomodoro from '../../containers/Pomodoro';
import PomodoroCountdown from '../../containers/PomodoroCountdown';
import PomodoroForm from '../../containers/PomodoroForm';

const Home = ({ uiState }: { uiState: any }) => {
  const { COUNTDOWN, FORM, INITIAL } = UI_STATES;

  return (
    <>
      {(function() {
        switch (uiState) {
          case COUNTDOWN:
            return <PomodoroCountdown />;
          case FORM:
            return <PomodoroForm />;
          case INITIAL:
            return <Pomodoro />;
          default:
            return null;
        }
      })()}
    </>
  );
};

export default Home;
