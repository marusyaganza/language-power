import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import styles from './side-drawer.css';

export const SideDrawer = ({ open, children }) => {
  const content = open ? (
    <aside className={styles.sideDrawer}>{children}</aside>
  ) : null;
  return ReactDom.createPortal(content, document.getElementById('drawer'));
};

SideDrawer.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.node
};

SideDrawer.defaultProps = {
  open: false,
  children: null
};
