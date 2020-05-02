/* eslint-disable react/prop-types */
import React from 'react';
import styles from './fancy-heading.css';

export const FancyHeading = ({ children }) => {
  return (
    <div className={styles.headingContainer}>
      <h2 className={styles.heading}>{children}</h2>
    </div>
  );
};
