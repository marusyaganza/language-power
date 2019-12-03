import React from 'react';
import './button.css';

const Button = ({onClick, disabled, children}) => {
    return (
        <button className="button" disabled={disabled} onClick={onClick}>
            {children}
        </button>
    )
};

export {Button};