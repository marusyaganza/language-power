/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import styles from './button.css';
import { SIZES, TYPES, DEFAULT_TYPE, DEFAULT_SIZE } from './constants';

export const Button = ({
  children,
  onClick,
  disabled,
  type,
  size,
  className,
  kind,
  autoFocus,
  id,
  href,
  ...rest
}) => {
  if (href) {
    return (
      <Link
        to={href}
        className={cn(
          styles.button,
          styles[`size${size}`],
          className,
          styles[kind]
        )}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={cn(
        styles.button,
        styles[`size${size}`],
        className,
        styles[kind]
      )}
      type={type}
      autoFocus={autoFocus}
      onClick={onClick}
      disabled={disabled}
      id={id}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(TYPES),
  size: PropTypes.oneOf(SIZES),
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  kind: PropTypes.string,
  id: PropTypes.string,
  autoFocus: PropTypes.bool,
  href: PropTypes.string
};

Button.defaultProps = {
  type: DEFAULT_TYPE,
  size: DEFAULT_SIZE,
  children: null,
  className: null,
  disabled: false,
  onClick: () => {},
  kind: 'yellow',
  id: null,
  autoFocus: false,
  href: null
};
