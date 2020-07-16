import React from 'react';
import cn from 'classnames';
import styles from './spinner.css';

export const Spinner = () => {
  return (
    <div className={styles.spinnerBox}>
      <p className={styles.altText} role="alert">
        Loading...
      </p>
      <div className={styles.pulseContainer} data-testid="spinner-animation">
        <div className={cn(styles.pulseBubble, styles.pulseBubble1)} />
        <div className={cn(styles.pulseBubble, styles.pulseBubble2)} />
        <div className={cn(styles.pulseBubble, styles.pulseBubble3)} />
      </div>
    </div>
  );
};
