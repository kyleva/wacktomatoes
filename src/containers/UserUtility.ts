/** Third-party dependencies */
import { connect } from 'react-redux';

/** Our code */
// Components
import UserUtility from '../components/UserUtility/UserUtility';
// Selectors
import { selectAccount } from '../api/account/selectors';

const mapStateToProps = (state: RootState) => ({
  email: selectAccount(state).email,
});

export default connect(mapStateToProps)(UserUtility);
