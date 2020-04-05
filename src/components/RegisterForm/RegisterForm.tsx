/** Third-party libraries */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

/** Our code */
// Actions
import { registerStart } from '../../api/account/actions';

interface RegisterFormProps {
  dispatch: Dispatch;
}

const RegisterForm = ({ dispatch }: RegisterFormProps) => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formIsValid = () => {
    const fields = [confirmPassword, email, password];

    // if any fields are empty don't submit
    if (fields.some(field => field === '')) {
      return false;
    }

    // if password fields are not equal dont submit
    if (password !== confirmPassword) {
      return false;
    }

    return true;
  };

  return (
    <div className="account-form">
      <label htmlFor="input-email">Email</label>
      <input
        id="input-email"
        type="text"
        onChange={e => setEmail(e.target.value)}
        value={email}
      />

      <label htmlFor="input-password">Password</label>
      <input
        id="input-password"
        type="password"
        onChange={e => setPassword(e.target.value)}
        value={password}
      />

      <label htmlFor="input-confirm-password">Confirm Password</label>
      <input
        id="input-confirm-password"
        type="password"
        onChange={e => setConfirmPassword(e.target.value)}
        value={confirmPassword}
      />

      <button
        onClick={() => {
          if (formIsValid()) {
            dispatch(registerStart({ email, password }));
          }
        }}
      >
        Register
      </button>

      <hr />
      <p>
        Already have an account? <Link to="/">Login here.</Link>
      </p>
    </div>
  );
};

export default connect()(RegisterForm);
