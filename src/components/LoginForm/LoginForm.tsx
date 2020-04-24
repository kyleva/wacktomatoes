/** Third-party libraries */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import * as Yup from 'yup';

/** Our code */
// Actions
import { loginFetchStart } from '../../api/account/actions';

interface LoginProps {
  dispatch: Dispatch;
}

const Login = ({ dispatch }: LoginProps) => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string().required(),
        password: Yup.string().required(),
      })}
      onSubmit={({ email, password }) => {
        dispatch(loginFetchStart({ email, password }));
      }}
    >
      <>
        <Form>
          <label htmlFor="email">Email</label>
          <Field name="email" type="text" />
          <ErrorMessage name="email" />

          <label htmlFor="password">Password</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" />

          <button type="submit">Login</button>
        </Form>

        <hr />
        <p>
          Don't have an account? <Link to={`/register`}>Register here</Link>
        </p>
      </>
    </Formik>
  );
};

export default connect()(Login);
