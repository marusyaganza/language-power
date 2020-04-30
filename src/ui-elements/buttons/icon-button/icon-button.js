import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './icon-button.css';
import { Icon } from '../../icons/icon';
import { SIZES, KINDS } from './constants';

export const IconButton = ({ kind, onClick, size, iconHint, disabled, id }) => {
  return (
    <button
      id={id}
      className={cn(styles.button, styles[kind])}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      <Icon
        id={kind}
        width={SIZES[size]}
        height={SIZES[size]}
        tooltip={iconHint || kind}
      />
    </button>
  );
};

IconButton.propTypes = {
  iconHint: PropTypes.string,
  onClick: PropTypes.func,
  kind: PropTypes.oneOf(KINDS).isRequired,
  size: PropTypes.oneOf(SIZES),
  disabled: PropTypes.bool,
  id: PropTypes.string
};

IconButton.defaultProps = {
  iconHint: '',
  onClick: () => {},
  size: SIZES.M,
  disabled: false,
  id: null
};
