import PropTypes from 'prop-types';
import React from 'react';
import './pop-up.css';

const PopUp = ({ children, open, id, onClose }) => {
    // TODO fix this handler
    const handleKey = e => {
        console.log('e', e);
        if (e.key === 'Esc') {
            onClose();
        }
    };
    return (
        <>
            <dialog onKeyPress={handleKey} className="pop-up" id={id} open={open}>
        <span className="close-button">
          <button id="close" autoFocus={open} type="button" onClick={onClose}>
            X
          </button>
        </span>
                {children}
            </dialog>
            {open && (
                <div
                    onKeyPress={handleKey}
                    onClick={onClose}
                    className="backdrop"
                    role="button"
                />
            )}
        </>
    );
};

PopUp.defaultProps = {
    id: '',
    children: null,
    open: false
};

PopUp.propTypes = {
    id: PropTypes.string,
    children: PropTypes.oneOf(PropTypes.elementType, PropTypes.array),
    open: PropTypes.bool
};

export { PopUp };
