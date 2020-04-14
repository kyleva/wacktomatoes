import { connect } from 'react-redux';

import { getPomodorosByDay } from '../api/pomodoro/selectors';

import History from '../components/History/History';

const mapStateToProps = (state: RootState) => ({
  pomodoros: getPomodorosByDay(state),
});

export default connect(mapStateToProps)(History);
