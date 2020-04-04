/** Third-party libraries */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import React, { useState } from 'react';

/** Our code */
// Actions
import { loginFetchStart } from '../../api/account/actions';

interface LoginProps {
  dispatch: Dispatch;
}

const Login = ({ dispatch }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="account-form">
      <label htmlFor="input-email">Email</label>
      <input
        id="input-email"
        type="text"
        onChange={e => setEmail(e.target.value)}
      />

      <label htmlFor="input-password">Password</label>
      <input
        id="input-password"
        type="password"
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={() => dispatch(loginFetchStart({ email, password }))}>
        Login
      </button>

      <hr />
      <p>
        Don't have an account? <u>Register here</u>
      </p>
    </div>
  );
};

export default connect()(Login);
