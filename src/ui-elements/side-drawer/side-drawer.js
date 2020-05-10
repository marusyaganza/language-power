import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import styles from './side-drawer.css';

export const SideDrawer = ({ open, children }) => {
  const content = (
    <aside className={cn(styles.sideDrawer, { [`${styles.open}`]: open })}>
      {children}
    </aside>
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
