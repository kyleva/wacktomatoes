/** Third-party libraries */
import { Dispatch } from 'redux';
import { ErrorMessage, Field, Form, Formik, yupToFormErrors } from 'formik';
import React from 'react';
import * as Yup from 'yup';

/** Our code */
// Actions
import {
  addPomodoro,
  cancelCountdown,
  startCountdown,
} from '../../api/pomodoro/actions';
// Constants
import { COUNTDOWN_TYPES } from '../../api/pomodoro/constants';

interface PomodoroCountdownProps {
  dispatch: Dispatch;
}

const PomodoroForm = ({ dispatch }: PomodoroCountdownProps) => {
  return (
    <Formik
      initialValues={{ description: '' }}
      onSubmit={({ description }) => {
        dispatch(addPomodoro({ description }));
        dispatch(
          startCountdown({
            countdownType: COUNTDOWN_TYPES.BREAK,
            duration: 1000 * 60 * 5,
          }),
        );
      }}
      validationSchema={Yup.object({ description: Yup.string().required() })}
    >
      <Form>
        <Field name="description" type="text" />
        <ErrorMessage name="description" />

        <button type="submit">Submit</button>
        <button onClick={() => dispatch(cancelCountdown())}>Cancel</button>
      </Form>
    </Formik>
  );
};

export default PomodoroForm;
