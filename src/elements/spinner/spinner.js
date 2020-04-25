import React from 'react';
import cn from 'classnames';
import styles from './spinner.css';

export const Spinner = () => {
  return (
    <div className={styles.spinnerBox}>
      <div className={styles.pulseContainer}>
        <div className={cn(styles.pulseBubble, styles.pulseBubble1)} />
        <div className={cn(styles.pulseBubble, styles.pulseBubble2)} />
        <div className={cn(styles.pulseBubble, styles.pulseBubble3)} />
      </div>
    </div>
  );
};