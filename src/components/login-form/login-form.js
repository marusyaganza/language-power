import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './login-form.css';
import { Button } from '../buttons/button/button';
import { loginConfig, signUpConfig } from './config';
import { Form } from '../form/form';

export const LoginForm = ({ onSubmit }) => {
  const submitHandler = e => {
    e.preventDefault();
    onSubmit();
  };

  const [isLogin, setIsLogin] = useState(true);

  const changeModeHandler = () => {
    setIsLogin(curr => !curr);
  };

  return (
    <>
      <section className={styles.form}>
        {isLogin ? (
          <Form {...loginConfig} onSubmit={submitHandler} />
        ) : (
          <Form {...signUpConfig} onSubmit={submitHandler} />
        )}
      </section>
      <section className={styles.modeSet}>
        {isLogin ? (
          <p className={styles.modeSetText}>
            Do not have an account? Sign upt, it is free!
          </p>
        ) : (
          <p className={styles.modeSetText}>Already have an account?</p>
        )}
        <Button size="S" onClick={changeModeHandler}>
          {isLogin ? 'Sign up' : 'Login'}
        </Button>
      </section>
    </>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
