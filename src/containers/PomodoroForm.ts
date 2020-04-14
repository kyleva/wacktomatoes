/** Third-party libraries */
import { connect } from 'react-redux';

/** Our code */
// Components
import PomodoroForm from '../components/PomodoroForm/PomodoroForm';
// Selectors
import { selectPomodoro } from '../api/pomodoro/selectors';

const mapStateToProps = (state: RootState) => {
  const { duration, endTime, startTime } = selectPomodoro(state).current;

  return {
    duration,
    endTime,
    startTime,
  };
};

export default connect(mapStateToProps)(PomodoroForm);
