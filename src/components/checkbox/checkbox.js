import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import uuid from 'uuid';
import styles from './checkbox.css';
import { DictionaryEntity } from '../dictionary-entity/dictionary-entity';

export const Checkbox = ({ options, value, onChange, className, isError }) => {
  const chengeHandler = e => {
    const currValue = e.target.value;
    const newValues = [...value];
    if (!value.includes(currValue)) {
      newValues.push(currValue);
    } else {
      newValues.pop(currValue);
    }
    const result = newValues.sort((a, b) => a - b).join('');
    onChange(result);
  };
  return (
    <ul className={cn(styles.optionBox, className)}>
      {options.map((option, i) => {
        const checked = value.includes(i);
        const hash = uuid();
        return (
          <li key={hash} className={styles.box}>
            <input
              className={styles.optionInput}
              onChange={chengeHandler}
              type="checkbox"
              checked={checked}
              id={option}
              name="optionBox"
              value={i}
            />
            <label
              className={cn(
                styles.option,
                { [`${styles.checked}`]: checked },
                { [`${styles.error}`]: isError }
              )}
              htmlFor={option}
            >
              {/* {option} */}
              <DictionaryEntity text={option} />
            </label>
          </li>
        );
      })}
    </ul>
  );
};

Checkbox.defaultProps = {
  options: [],
  value: '',
  onChange: () => {},
  className: null,
  isError: false
};

Checkbox.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  isError: PropTypes.bool
};
