import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import { v4 as uuid } from 'uuid';
import styles from './option-box.css';
import { DictionaryEntity } from '../dictionary-entity/dictionary-entity';

export const OptionBox = React.memo(
  ({ options, value, onChange, className, isError, type }) => {
    const changeHandler = e => {
      const currValue = e.target.value;
      if (type === 'checkbox') {
        let newValues = [...value];
        if (!value.includes(currValue)) {
          newValues.push(currValue);
        } else {
          newValues = newValues.filter(item => item !== currValue);
        }
        const result = newValues.sort((a, b) => a - b).join('');
        onChange(result);
      } else {
        onChange(currValue);
      }
    };

    return (
      <ul className={cn(styles.optionBox, className)}>
        {options.map((option, i) => {
          const checked = value.includes(i);
          const hash = uuid();
          return (
            <li key={hash} className={styles.box}>
              <label
                className={cn(
                  styles.option,
                  { [`${styles.checked}`]: checked },
                  { [`${styles.error}`]: isError }
                )}
                htmlFor={option}
              >
                <input
                  autoFocus
                  className={styles.optionInput}
                  onChange={changeHandler}
                  type={type}
                  checked={checked}
                  id={option}
                  name="optionBox"
                  value={i}
                />
                <DictionaryEntity text={option} />
              </label>
            </li>
          );
        })}
      </ul>
    );
  }
);

OptionBox.defaultProps = {
  options: [],
  value: '',
  onChange: () => {},
  className: null,
  isError: false,
  type: 'radio'
};

OptionBox.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  isError: PropTypes.bool,
  type: PropTypes.string
};
