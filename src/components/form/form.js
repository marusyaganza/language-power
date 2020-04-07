import React from 'react';
import PropTypes from 'prop-types';

import styles from './form.css';
import { Input } from '../smart-input/input';
import { Button } from '../buttons/button/button';
import { useForm } from '../../utils/hooks/useForm';

export const Form = ({ onSubmit, initialState, fields }) => {
  const submitHandler = e => {
    e.preventDefault();
    onSubmit();
  };

  const [state, changeHandler] = useForm(initialState);

  const { isValid } = state;

  const renderFields = () => {
    return fields.map(field => {
      return (
        <Input
          {...field}
          key={field.id}
          className={styles.input}
          onInput={changeHandler}
          labelStyle={styles.label}
        />
      );
    });
  };

  return (
    <form onSubmit={submitHandler}>
      {renderFields()}
      <div className={styles.buttonSet}>
        <Button disabled={!isValid} type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  fields: PropTypes.arrayOf(PropTypes.object)
};

Form.defaultProps = {
  initialState: {},
  fields: []
};
