import PropTypes from 'prop-types';
import React from 'react';
import styles from './pop-up.css';
import { IconButton } from '../buttons/icon-button/icon-button';

const PopUp = ({ children, open, id, onClose }) => {
  // TODO fix this handler
  const handleKey = e => {
    // console.log('e', e);
    if (e.key === 'Esc') {
      onClose();
    }
  };
  return (
    <>
      <dialog className={styles.dialog} id={id} open={open}>
        <span className={styles.closeButton}>
          <IconButton onClick={onClose} kind="close" iconHint="close window" />
        </span>
        <div className={styles.content}>{children}</div>
      </dialog>
      {open && (
        <div
          onKeyPress={handleKey}
          onClick={onClose}
          className={styles.backdrop}
          role="button"
          tabIndex="-1"
          aria-label="backdrop"
        />
      )}
    </>
  );
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
