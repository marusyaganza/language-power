import React from 'react';
import ReactDOM from 'react-dom';

import styles from './backdrop.css';

export const Backdrop = ({ onClick, onKeyDown }) => {
  return ReactDOM.createPortal(
    <div
      className={styles.backdrop}
      onKeyDown={onKeyDown}
      onClick={onClick}
      role="button"
      tabIndex="-1"
      aria-label="backdrop"
    />,
    document.getElementById('backdrop')
  );
};
