/** Third-party libraries */
import React from 'react';
import { Dispatch } from 'redux';

/** Our code */
import { logoutStart } from '../../api/account/actions';

interface UserUtilityProps {
  dispatch: Dispatch;
  email: string;
}

const UserUtility = ({ dispatch, email }: UserUtilityProps) => {
  return (
    <div>
      {email && (
        <div>
          Signed in as{' '}
          <span style={{ textDecoration: 'underline' }}>{email}</span>.{' '}
          <button onClick={() => dispatch(logoutStart())}>Sign out</button>
        </div>
      )}
    </div>
  );
};

export default UserUtility;
