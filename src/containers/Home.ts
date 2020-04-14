import { connect } from 'react-redux';

import { selectUI } from '../api/ui/selectors';

import Home from '../components/Home/Home';

const mapStateToProps = (state: RootState) => ({
  uiState: selectUI(state).uiState,
});

export default connect(mapStateToProps)(Home);
