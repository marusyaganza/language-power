import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import styles from './login-form.css';
import { Button } from '../buttons/button/button';
import { config } from './config';
import { Form } from '../form/form';
import { useFetch } from '../../utils/hooks/fetch/useFetch';
import { AppContext } from '../../app-context/appContext';
import { Spinner } from '../../elements/spinner/spinner';

export const LoginForm = ({ onSubmit }) => {
  const { login } = useContext(AppContext);
  const [state, fetchFunc] = useFetch();
  const [isLogin, setIsLogin] = useState(true);
  const { result, loading, error } = state;

  const submitHandler = inputs => {
    const url = `http://localhost:5000/api/user/${
      isLogin ? 'login' : 'signup'
    }`;
    const method = 'POST';
    const headers = { 'Content-Type': 'application/json' };
    const body = { email: inputs.email.value, password: inputs.password.value };
    if (!isLogin) {
      body.name = inputs.name.value;
    }
    fetchFunc({
      url,
      requestOptions: { body: JSON.stringify(body), headers, method }
    });
  };

  const changeModeHandler = () => {
    setIsLogin(curr => !curr);
  };

  useEffect(() => {
    if (result && result.id) {
      const { id } = result;
      login(id);
      onSubmit();
    }
  }, [result]);

  const renderForm = () => {
    if (loading) {
      return <Spinner />;
    }
    const { loginConfig, signUpConfig } = config;
    const { formConfig, texts } = isLogin ? loginConfig : signUpConfig;
    return (
      <>
        <section className={styles.form}>
          <Form {...formConfig} onSubmit={submitHandler} />
        </section>
        <section className={styles.modeSet}>
          <p className={styles.modeSetText}>{texts.changeModeText}</p>
          <Button size="S" onClick={changeModeHandler}>
            {texts.changeModeButtonText}
          </Button>
        </section>
      </>
    );
  };

  return (
    <>
      {error && (
        <section className={styles.error}>
          <p>Error occured: {error}</p>
        </section>
      )}
      {renderForm()}
    </>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
