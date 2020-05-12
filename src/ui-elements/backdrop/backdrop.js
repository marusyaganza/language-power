import React from 'react';
import { createPortal } from 'react-dom';

import styles from './backdrop.css';

export const Backdrop = ({ onClick, onKeyUp }) => {
  return createPortal(
    <div
      className={styles.backdrop}
      onKeyUp={onKeyUp}
      onClick={onClick}
      role="button"
      tabIndex="0"
      aria-label="backdrop"
    />,
    document.getElementById('backdrop')
  );
};
