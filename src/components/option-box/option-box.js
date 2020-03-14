import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import styles from './option-box.css';

export const OptionBox = ({ options, value, onChange, className, isError }) => {
  return (
    <ul className={cn(styles.optionBox, className)}>
      {options.map(option => {
        const checked = value === option;
        return (
          <li className={styles.box}>
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
  className: PropTypes.objectOf(PropTypes.string),
  isError: PropTypes.bool
};
