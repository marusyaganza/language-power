import React from 'react';
import ReactDOM from 'react-dom';

import styles from './backdrop.css';

export const Backdrop = ({ onClick, onKeyUp }) => {
  return ReactDOM.createPortal(
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
