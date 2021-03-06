import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { CHANGE, TOUCH } from './input-actions';
import { inputReducer } from './input-reducer';
import styles from './input.css';

export const Input = ({
  label,
  name,
  disabled,
  className,
  errorText,
  labelStyle,
  autoComplete,
  validators,
  valid,
  onInput,
  initialValue,
  type,
  autoFocus,
  ...rest
}) => {
  const [state, dispatch] = useReducer(inputReducer, {
    value: initialValue,
    isValid: valid,
    isTouched: false
  });

  const changeHandler = e => {
    dispatch({ type: CHANGE, payload: { value: e.target.value, validators } });
  };

  const blurHandler = () => {
    dispatch({ type: TOUCH });
  };

  const { value, isValid } = state;

  useEffect(() => {
    onInput({ name, value: state.value, isValid: state.isValid });
  }, [value, isValid, name, onInput]);

  const isError = state.isTouched && !state.isValid && state.value;
  return (
    <div className={className || styles.inputContainer}>
      <p
        className={cn(
          { [`${styles.errorTextActive}`]: isError },
          styles.errorText
        )}
        aria-hidden={!isError}
        role="status"
      >
        {errorText}
      </p>
      <input
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        className={cn(
          styles.input,
          { [`${styles.error}`]: isError },
          { [`${styles.valid}`]: state.isValid }
        )}
        type={type}
        id={name}
        disabled={disabled}
        value={state.value}
        onChange={changeHandler}
        onBlur={blurHandler}
        {...rest}
      />
      {label && (
        <label className={labelStyle || styles.label} htmlFor={name}>
          {label}
        </label>
      )}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  labelStyle: PropTypes.string,
  className: PropTypes.string,
  errorText: PropTypes.string,
  autoComplete: PropTypes.oneOf(['off', 'on']),
  type: PropTypes.string,
  validators: PropTypes.arrayOf(PropTypes.object),
  initialValue: PropTypes.string,
  valid: PropTypes.bool,
  onInput: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool
};

Input.defaultProps = {
  label: '',
  disabled: false,
  className: null,
  errorText: '',
  autoComplete: 'off',
  labelStyle: null,
  type: 'text',
  validators: [],
  initialValue: '',
  valid: false,
  autoFocus: false
};
