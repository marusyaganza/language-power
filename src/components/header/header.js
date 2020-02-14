import React from 'react';
import PropTypes from 'prop-types';

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
  return (
    <header className="header">
      <nav className="header_nav">
        <ul className="header_nav-items">{renderNav(navItems)}</ul>
      </nav>
      {children}
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
