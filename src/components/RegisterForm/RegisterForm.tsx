/** Third-party libraries */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import * as Yup from 'yup';

/** Our code */
// Actions
import { registerStart } from '../../api/account/actions';

interface RegisterFormProps {
  dispatch: Dispatch;
}

const RegisterForm = ({ dispatch }: RegisterFormProps) => {
  return (
    <Formik
      initialValues={{ confirmEmail: '', email: '', password: '' }}
      onSubmit={({ email, password }) => {
        dispatch(registerStart({ email, password }));
      }}
      validationSchema={Yup.object({
        confirmEmail: Yup.string()
          .email()
          .oneOf([Yup.ref('email'), null], 'Passwords must match')
          .required(),
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      })}
    >
      <>
        <Form>
          <label htmlFor="email">Email</label>
          <Field name="email" type="text" />
          <ErrorMessage name="email" />

          <label htmlFor="confirmEmail">Confirm Email</label>
          <Field name="confirmEmail" type="text" />
          <ErrorMessage name="confirmEmail" />

          <label htmlFor="password">Password</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" />

          <button type="submit">Register</button>
        </Form>

        <hr />
        <p>
          Already have an account? <Link to="/">Login here.</Link>
        </p>
      </>
    </Formik>
  );
};

export default connect()(RegisterForm);
