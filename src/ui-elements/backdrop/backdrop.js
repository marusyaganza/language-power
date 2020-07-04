import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import 'wicg-inert';

import styles from './backdrop.css';

export const Backdrop = ({ onClick, onKeyUp, show }) => {
  useEffect(() => {
    const root = document.querySelector('#root');
    root.setAttribute('inert', '');
    return () => {
      root.removeAttribute('inert');
    };
  }, []);
  return createPortal(
    <div
      className={cn(styles.backdrop, { [`${styles.show}`]: show })}
      onKeyUp={onKeyUp}
      onClick={onClick}
      role="button"
      tabIndex="0"
      aria-label="backdrop"
    />,
    document.getElementById('backdrop')
  );
};
