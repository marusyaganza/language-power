import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '../icons/icon';
import './header.css';

export const Header = ({ navItems, children }) => {
  const renderNav = items => {
    return items.map(element => {
      return (
        <li className="header_nav-item list">
          <a href={element.link} className="header_nav-link link">
            {element.label}
          </a>
        </li>
      );
    });
  };
  // TODO fix logo icon
  return (
    <header className="header">
      <a className="header_logo link" href="/">
        <div className="header_logo__text">Language power</div>
        <i>
          <Icon width={11} height={12} id="book" />
        </i>
      </a>
      <nav className="header_nav">
        <ul className="header_nav-items">{renderNav(navItems)}</ul>
      </nav>
      <div className="header_items">{children}</div>
    </header>
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
