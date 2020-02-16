import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { Link } from 'react-router-dom';
import { Icon } from '../icons/icon';
import './header.css';

export const Header = ({ navItems, children }) => {
  const renderNav = items => {
    return items.map(element => {
      return (
        <li key={uuid()} className="header_nav-item list">
          <Link to={element.link} className="header_nav-link link">
            {element.label}
          </Link>
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
          <Icon width={16} height={16} id="hand-spock" />
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
