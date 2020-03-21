/** Third party libraries */
import { connect } from 'react-redux';

/** Our code */
// Components
import Countdown from '../components/PomodoroCountdown/PomodoroCountdown';
// Selectors
import { selectPomodoro } from '../api/pomodoro/selectors';

const mapStateToProps = (state: any) => ({
  timeInitiated: selectPomodoro(state).timeInitiated,
});

export default connect(mapStateToProps)(Countdown);
