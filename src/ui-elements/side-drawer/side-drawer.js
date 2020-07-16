import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import styles from './side-drawer.css';
import { Backdrop } from '../backdrop/backdrop';

export const SideDrawer = ({ open, children, backdropHandler }) => {
  const [openClass, setOpenClass] = useState(false);
  const [close, setClose] = useState(true);
  useEffect(() => {
    setOpenClass(open);
  }, [open]);

  const transitionHandler = () => {
    setClose(!open);
  };

  if (!open && close) {
    return null;
  }

  const content = (
    <>
      <aside
        data-testid="sidedrawer"
        className={cn(styles.sideDrawer, { [`${styles.open}`]: openClass })}
        onTransitionEnd={transitionHandler}
      >
        {children}
      </aside>
      <Backdrop show={openClass} onClick={backdropHandler} />
    </>
  );
  return createPortal(content, document.getElementById('drawer'));
};

SideDrawer.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.node
};

SideDrawer.defaultProps = {
  open: false,
  children: null
};
