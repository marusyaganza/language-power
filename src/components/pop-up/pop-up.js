import PropTypes from 'prop-types';
import React from 'react';
import styles from './pop-up.css';

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
      <dialog className={styles.popUp} id={id} open={open}>
        <span className={styles.closeButton}>
          <button
            onKeyPress={handleKey}
            id="close"
            type="button"
            onClick={onClose}
          >
            X
          </button>
        </span>
        {children}
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
  children: PropTypes.oneOf(PropTypes.elementType, PropTypes.array),
  open: PropTypes.bool,
  onClose: () => {}
};

export { PopUp };
