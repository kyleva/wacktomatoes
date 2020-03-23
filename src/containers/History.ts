import { connect } from 'react-redux';

import { getHistoryView } from '../api/history/selectors';

import History from '../components/History/History';

const mapStateToProps = (state: RootState) => ({
  history: getHistoryView(state).history,
});

export default connect(mapStateToProps)(History);
