/* eslint-disable react/prop-types */
import React from 'react';
import styles from './error-container.css';

export const ErrorContainer = ({ children }) => {
  return (
    <div role="alert" aria-live="assertive" className={styles.error}>
      {children}
    </div>
  );
};
