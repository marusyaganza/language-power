import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import styles from './login-form.css';
import { Button } from '../../ui-elements/buttons/button/button';
import { config } from './config';
import { Form } from '../../ui-elements/form/form';
import { useFetch } from '../../utils/hooks/fetch/useFetch';
import { AppContext } from '../../app-context/appContext';
import { Spinner } from '../../ui-elements/spinner/spinner';
import { userUrl } from '../../constants/urls';
import commonStyles from '../../assets/styles/common-styles.css';

export const LoginForm = ({ onSubmit }) => {
  const { login } = useContext(AppContext);
  const [state, fetchFunc, resetData] = useFetch();
  const [isLogin, setIsLogin] = useState(true);
  const { result, loading, error } = state;

  const submitHandler = inputs => {
    const url = `${userUrl}${isLogin ? 'login' : 'signup'}`;
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
    resetData({ error: null });
  };

  useEffect(() => {
    if (result && result.userId) {
      const { userId, token } = result;
      login(userId, token);
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
        <section>
          <p role="alert" className={commonStyles.error}>
            Error occured: {error}
          </p>
        </section>
      )}
      {renderForm()}
    </>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
