/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import React, { useEffect, useRef, useContext } from 'react';
import styles from './pop-up.css';
import { IconButton } from '../buttons/icon-button/icon-button';
import { Backdrop } from '../backdrop/backdrop';
import { AppContext } from '../../app-context/appContext';

const PopUp = ({ children, open, id, onClose }) => {
  const { setIsModalOpen } = useContext(AppContext);
  const keyHandler = e => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const dialogRef = useRef(null);

  const focusOutsideHandler = event => {
    if (!dialogRef.current.contains(event.target)) {
      dialogRef.current.querySelector('#close').focus();
    }
  };

  useEffect(() => {
    if (open) {
      const focusable = dialogRef.current.querySelector('input')
      || dialogRef.current.querySelector('button[type=button]:not(#close)');
      if (focusable) {
        focusable.focus();
      }
      setIsModalOpen(open);
      document.addEventListener('focusin', focusOutsideHandler);
    } else {
      setIsModalOpen(open);
      document.removeEventListener('focusin', focusOutsideHandler);
    }

    return () => {
      setIsModalOpen(false);
      document.removeEventListener('focusin', focusOutsideHandler);
    };
  }, [open]);

  const component = open ? (
    <>
      <dialog
        onKeyUp={keyHandler}
        className={styles.dialog}
        id={id}
        open={open}
        ref={dialogRef}
      >
        <span className={styles.closeButton}>
          <IconButton
            id="close"
            onClick={onClose}
            kind="close"
            iconHint="close window"
            tabIndex="0"
          />
        </span>
        <div className={styles.content}>{children}</div>
      </dialog>
      {open && <Backdrop onClick={onClose} />}
    </>
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
