import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './input.css';

export const Input = ({
  label,
  name,
  disabled,
  onChange,
  className,
  value,
  isError,
  autoComplete
}) => {
  const changeHandler = e => {
    onChange(e.target.value);
  };
  return (
    <div className={cn(className, styles.inputContainer)}>
      <input
        autoComplete={autoComplete}
        className={cn(styles.input, { [`${styles.error}`]: isError })}
        type="text"
        id={name}
        disabled={disabled}
        value={value}
        onChange={changeHandler}
      />
      {label && (
        <label className={styles.label} htmlFor={name}>
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
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  isError: PropTypes.bool,
  autoComplete: PropTypes.oneOf(['off', 'on'])
};

Input.defaultProps = {
  label: '',
  disabled: false,
  className: null,
  isError: false,
  autoComplete: 'off'
};
