import { connect } from 'react-redux';

import { selectPomodoro } from '../api/pomodoro/selectors';

import Home from '../components/Home/Home';

const mapStateToProps = (state: any) => ({
  uiState: selectPomodoro(state).uiState,
});

export default connect(mapStateToProps)(Home);
