/** Third party libraries */
import { connect } from 'react-redux';

/** Our code */
// Components
import Countdown from '../components/PomodoroCountdown/PomodoroCountdown';
// Selectors
import { getCountdownView, selectPomodoro } from '../api/pomodoro/selectors';

const mapStateToProps = (state: RootState) => {
  const { duration, startTime } = selectPomodoro(state).current;
  const { isCancelButtonVisible } = getCountdownView(state);

  return {
    duration,
    isCancelButtonVisible,
    startTime,
  };
};

export default connect(mapStateToProps)(Countdown);
