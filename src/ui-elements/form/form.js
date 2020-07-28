import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './form.css';
import commonStyles from '../../assets/styles/common-styles.css';
import { Input } from '../smart-input/input';
import { Button } from '../buttons/button/button';
import { useForm } from '../../utils/hooks/useForm';

export const Form = ({ onSubmit, initialState, fields }) => {
  const [state, changeHandler, setFormData] = useForm(initialState);
  const { isValid, inputs } = state;

  useEffect(() => {
    setFormData(fields, initialState);
  }, [fields]);

  const submitHandler = e => {
    e.preventDefault();
    onSubmit(inputs);
  };

  const renderFields = () => {
    return fields.map((field, i) => {
      return (
        <Input
          autoFocus={i === 0}
          {...field}
          key={field.id}
          className={styles.input}
          onInput={changeHandler}
          labelStyle={styles.label}
          required
        />
      );
    });
  };
  return (
    <form onSubmit={submitHandler}>
      {renderFields()}
      <div className={commonStyles.buttonSet}>
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
