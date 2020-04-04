import React from 'react';

// Constants
import { UI_STATES } from '../../api/pomodoro/constants';
// Containers
import LoginForm from '../LoginForm/LoginForm';
import Pomodoro from '../../containers/Pomodoro';
import PomodoroCountdown from '../../containers/PomodoroCountdown';
import PomodoroForm from '../../containers/PomodoroForm';

const Home = ({ uiState }: { uiState: UnionOf<typeof UI_STATES> }) => {
  const { COUNTDOWN, DASHBOARD, FORM, INITIAL } = UI_STATES;

  return (
    <>
      {(function() {
        switch (uiState) {
          case COUNTDOWN:
            return <PomodoroCountdown />;
          case DASHBOARD:
            return <Pomodoro />;
          case FORM:
            return <PomodoroForm />;
          case INITIAL:
            return <LoginForm />;
          default:
            return null;
        }
      })()}
    </>
  );
};

export default Home;
