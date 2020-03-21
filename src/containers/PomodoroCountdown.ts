/** Third party libraries */
import { connect } from 'react-redux';

/** Our code */
// Components
import Countdown from '../components/PomodoroCountdown/PomodoroCountdown';
// Selectors
import { selectPomodoro } from '../api/pomodoro/selectors';

const mapStateToProps = (state: any) => {
  const { duration, timeInitiated } = selectPomodoro(state);

  return {
    duration,
    timeInitiated,
  };
};

export default connect(mapStateToProps)(Countdown);
