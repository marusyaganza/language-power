import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { NavLink, Link } from 'react-router-dom';
import classnames from 'classnames';
import { Icon } from '../icons/icon';
import { IconButton } from '../buttons/icon-button/icon-button';
import styles from './header.css';

export const Header = ({ navItems, children }) => {
  const renderNav = items => {
    return items.map(element => {
      return (
        <li key={uuid()} className={styles.navItem}>
          <NavLink exact activeClassName={styles.activeLink} to={element.link}>
            {element.label}
          </NavLink>
        </li>
      );
    });
  };
  return (
      <>
    <header className={styles.header}>
      <Link className={classnames(styles.logo, styles.navLink)} to="/">
        <div>Language power</div>
        <i className={styles.logoIcon}>
          <Icon width={16} height={16} id="hand-spock" />
        </i>
      </Link>
      <nav className={styles.headerNav}>
        <ul className={styles.navItems}>{renderNav(navItems)}</ul>
      </nav>
      <div className={styles.items}>{children}</div>
    </header>
      <header className={styles.headerMobile}>
          <IconButton kind="bars" size="L"/>
        <Link className={classnames(styles.logo, styles.navLink)} to="/">
          <div>Language power</div>
          <i className={styles.logoIcon}>
            <Icon width={16} height={16} id="hand-spock" />
          </i>
        </Link>
      </header>
          </>
  );
};

Header.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({ link: PropTypes.string, label: PropTypes.string })
  ),
  children: PropTypes.node
};

Header.defaultProps = {
  navItems: [],
  children: null
};
