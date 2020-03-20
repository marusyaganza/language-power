import React, { useState } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { NavLink, Link } from 'react-router-dom';
import classnames from 'classnames';
import { Icon } from '../icons/icon';
import { IconButton } from '../buttons/icon-button/icon-button';
import { Backdrop } from '../../elements/backdrop/backdrop';
import { SideDrawer } from '../../elements/side-drawer/side-drawer';

import styles from './header.css';

export const Header = ({ navItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const clickHandler = () => {
    setIsOpen(!isOpen);
  };

  const renderNav = (items, handler) => {
    return items.map(element => {
      return (
        <li key={uuid()} className={styles.navItem}>
          <NavLink
            exact
            activeClassName={styles.activeLink}
            to={element.link}
            onClick={handler}
          >
            {element.label}
          </NavLink>
        </li>
      );
    });
  };
  return (
    <>
      {isOpen && <Backdrop onClick={clickHandler} />}
      <SideDrawer open={isOpen}>
        <ul className={styles.sideDrawerNav}>
          {renderNav(navItems, clickHandler)}
        </ul>
      </SideDrawer>
      <header className={styles.header}>
        <div className={styles.burgerButton}>
          <IconButton kind="bars" onClick={clickHandler} size="XL" />
        </div>
        <Link className={classnames(styles.logo, styles.navLink)} to="/">
          <div>Language power</div>
          <i className={styles.logoIcon}>
            <Icon width={16} height={16} id="hand-spock" />
          </i>
        </Link>
        <nav className={styles.headerNav}>
          <ul className={styles.navItems}>{renderNav(navItems)}</ul>
        </nav>
      </header>
    </>
  );
};

Header.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({ link: PropTypes.string, label: PropTypes.string })
  )
};

Header.defaultProps = {
  navItems: []
};
