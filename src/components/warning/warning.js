import React from 'react';
import PropTypes from 'prop-types';
import styles from './warning.css';
import commonStyles from '../../assets/styles/common-styles.css';
import { Button } from '../../ui-elements/buttons/button/button';

export const Warning = ({ text, buttonHandler }) => {
  if (!text) {
    return null;
  }
  return (
    <div className={styles.modal}>
      <p className={styles.warning}>{text}</p>
      <span className={commonStyles.buttonSet}>
        <Button onClick={buttonHandler} size="L" className={styles.button}>
          OK
        </Button>
      </span>
    </div>
  );
};

Warning.propTypes = {
  text: PropTypes.string.isRequired,
  buttonHandler: PropTypes.func.isRequired
};
