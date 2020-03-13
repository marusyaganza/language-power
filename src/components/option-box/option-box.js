import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import styles from './option-box.css';

export const OptionBox = ({ options, value, onChange, className }) => {
  return (
    <ul className={cn(styles.optionBox, className)}>
      {options.map(option => {
        return (
          <li>
            <input
              className={styles.optionInput}
              onChange={onChange}
              type="radio"
              checked={value === option}
              id="optionBox"
              name={option}
              value={option}
            />
            <label className={styles.option} htmlFor={option}>
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
  className: null
};

OptionBox.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.objectOf(PropTypes.string)
};
