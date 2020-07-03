/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import styles from './pop-up.css';
import { IconButton } from '../buttons/icon-button/icon-button';
import { Backdrop } from '../backdrop/backdrop';
import 'wicg-inert';

const PopUp = ({ children, open, id, onClose }) => {
  const [show, setShow] = useState(false);
  const keyHandler = e => {
    if (e.key === 'Escape' && open) {
      onClose();
    }
  };

  const dialogRef = useRef(null);

  const focusOutsideHandler = event => {
    if (!dialogRef.current.contains(event.target)) {
      dialogRef.current.querySelector('button[data-id="close"]').focus();
    }
  };

  const transitionHandler = () => {
    if (!show) {
      onClose();
    }
  };

  useEffect(() => {
    const root = document.querySelector('#root');
    if (open) {
      root.setAttribute('inert', '');
      setShow(true);
      const focusable = dialogRef.current.querySelector('input')
      || dialogRef.current.querySelector('button[type=button]:not([data-id=close])');
      if (focusable) {
        focusable.focus();
      }
      document.addEventListener('focusin', focusOutsideHandler);
    } else {
      root.removeAttribute('inert');
      document.removeEventListener('focusin', focusOutsideHandler);
    }

    return () => {
      root.removeAttribute('inert');
      document.removeEventListener('focusin', focusOutsideHandler);
    };
  }, [open]);

  const closeHandler = () => {
    setShow(false);
  };

  const component = open ? (
    <div className={styles.container}>
      <div
        onTransitionEnd={transitionHandler}
        onKeyUp={keyHandler}
        className={cn({ [`${styles.open}`]: show }, styles.dialog)}
        id={id}
        ref={dialogRef}
        role="dialog"
      >
        <span className={styles.closeButton}>
          <IconButton
            data-id="close"
            onClick={closeHandler}
            kind="close"
            iconHint="close window"
            tabIndex="0"
            altText="close window"
          />
        </span>
        <div className={styles.content}>{children}</div>
      </div>
      {open && <Backdrop onClick={closeHandler} />}
    </div>
  ) : null;
  return createPortal(component, document.getElementById('modal'));
};

PopUp.defaultProps = {
  id: '',
  children: null,
  open: false,
  onClose: PropTypes.func
};

PopUp.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  open: PropTypes.bool,
  onClose: () => {}
};

export { PopUp };
