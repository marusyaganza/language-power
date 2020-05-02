/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import styles from './link-button.css';
import { SIZES } from './constants';

// TODO add unique styles for this component
export const LinkButton = ({ children, href, size }) => {
  return (
    <Link className={cn(styles.button, styles[`size${size}`])} to={href}>
      {children}
    </Link>
  );
};

LinkButton.propTypes = {
  size: PropTypes.oneOf(SIZES),
  children: PropTypes.node,
  href: PropTypes.string
};

LinkButton.defaultProps = {
  size: SIZES.M,
  children: null,
  href: '#'
};
