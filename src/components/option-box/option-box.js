import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import uuid from 'uuid';
import styles from './option-box.css';
import { DictionaryEntity } from '../dictionary-entity/dictionary-entity';

export const OptionBox = ({ options, value, onChange, className, isError }) => {
  const changeHandler = e => {
    onChange(e.target.value);
  };
  return (
    <ul className={cn(styles.optionBox, className)}>
      {options.map(option => {
        const checked = value === option;
        const hash = uuid();
        return (
          <li key={hash} className={styles.box}>
            <input
              className={styles.optionInput}
              onChange={changeHandler}
              type="radio"
              checked={changeHandler}
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
              <DictionaryEntity text={option} />
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
