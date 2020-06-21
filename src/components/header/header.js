import React, { useState, useContext, Suspense } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { NavLink, Link } from 'react-router-dom';
import classnames from 'classnames';
import { Icon } from '../../ui-elements/icons/icon';
import { IconButton } from '../../ui-elements/buttons/icon-button/icon-button';
import { Backdrop } from '../../ui-elements/backdrop/backdrop';
import { SideDrawer } from '../../ui-elements/side-drawer/side-drawer';
import { Button } from '../../ui-elements/buttons/button/button';
import styles from './header.css';
import { LoginForm } from '../login-form/login-form';
import { AppContext } from '../../app-context/appContext';
import { Spinner } from '../../ui-elements/spinner/spinner';

const PopUp = React.lazy(() => import('../../ui-elements/pop-up'));
export const Header = ({ navItems }) => {
  const [showSidedrawer, setShowSidedrawer] = useState(false);
  const [showLoginForm, setShowLoginform] = useState(false);
  const context = useContext(AppContext);
  const { userId, logout } = context;

  const sideDrawerHandler = () => {
    setShowSidedrawer(!showSidedrawer);
  };

  const formCloseHandler = () => {
    setShowLoginform(state => !state);
  };

  const loginHandler = () => {
    if (userId) {
      logout();
    } else {
      formCloseHandler();
    }
  };

  const renderNav = (items, handler) => {
    return items.map(element => {
      return (
        <li key={uuid()}>
          <NavLink
            className={styles.navItem}
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
  const renderLoginForm = () => {
    return (
      <Suspense fallback={<Spinner />}>
        <PopUp open={showLoginForm} onClose={formCloseHandler} id="login">
          <LoginForm onSubmit={formCloseHandler} />
        </PopUp>
      </Suspense>
    );
  };
  return (
    <>
      {showSidedrawer && <Backdrop onClick={sideDrawerHandler} />}
      <SideDrawer open={showSidedrawer}>
        <nav className={styles.drawerNav}>
          <ul className={styles.sideDrawerNav}>
            {renderNav(navItems, sideDrawerHandler)}
          </ul>
        </nav>
      </SideDrawer>
      <header className={styles.header}>
        <div className={styles.burgerButton}>
          <IconButton kind="menu" onClick={sideDrawerHandler} size="XL" />
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
        {userId ? (
          <Button kind="login" onClick={loginHandler} size="S">
            Logout
          </Button>
        ) : (
          <Button
            size="S"
            onClick={loginHandler}
            kind="login"
            aria-haspopup
            aria-controls="login"
          >
            Login
          </Button>
        )}
      </header>
      {renderLoginForm()}
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
