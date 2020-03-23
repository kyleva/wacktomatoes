/** Third-party libraries */
import { connect } from 'react-redux';

/** Our code */
// Components
import PomodoroForm from '../components/PomodoroForm/PomodoroForm';
// Selectors
import { selectPomodoro } from '../api/pomodoro/selectors';

const mapStateToProps = (state: RootState) => {
  const { duration, timeCompleted, timeInitiated } = selectPomodoro(state);

  return {
    duration,
    timeCompleted,
    timeInitiated,
  };
};

export default connect(mapStateToProps)(PomodoroForm);
