/** Third party libraries */
import { connect } from 'react-redux';

/** Our code */
// Components
import Countdown from '../components/PomodoroCountdown/PomodoroCountdown';
// Selectors
import { getCountdownView, selectPomodoro } from '../api/pomodoro/selectors';

const mapStateToProps = (state: RootState) => {
  const { duration, timeInitiated } = selectPomodoro(state);
  const { isCancelButtonVisible } = getCountdownView(state);

  return {
    duration,
    isCancelButtonVisible,
    timeInitiated,
  };
};

export default connect(mapStateToProps)(Countdown);
