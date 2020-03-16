import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import uuid from 'uuid';
import styles from './option-box.css';

export const OptionBox = ({ options, value, onChange, className, isError }) => {
  return (
    <ul className={cn(styles.optionBox, className)}>
      {options.map(option => {
        const checked = value === option;
        const hash = uuid();
        return (
          <li key={hash} className={styles.box}>
            <input
              className={styles.optionInput}
              onChange={onChange}
              type="radio"
              checked={checked}
              id={option}
              name="optionBox"
              value={option}
            />
            <label
              className={cn(
                styles.option,
                { [`${styles.checked}`]: checked },
                { [`${styles.error}`]: isError }
              )}
              htmlFor={option}
            >
              {option}
            </label>
          </li>
        );
      })}
    </ul>
  );
};

OptionBox.defaultProps = {
  options: [],
  value: '',
  onChange: () => {},
  className: null,
  isError: false
};

OptionBox.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  isError: PropTypes.bool
};
