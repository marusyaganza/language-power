import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from './components/header/header';
import './styles.css';
import { NotFoundPage } from './pages/not-found/not-found';
import { PATHS } from './constants/paths';
import { PAGES } from './constants/pages';

const tags = Object.keys(PATHS);
const navItems = Object.values(PATHS);
const routing = tags.map(tag => {
  const path = PATHS[tag];
  const component = PAGES[tag];
  if (component) {
    return (
      <Route
        key={tag}
        exact={path.exact}
        path={path.link}
        component={PAGES[tag]}
      />
    );
  }
});

export const App = () => (
  <div className="page">
    <Header navItems={navItems} />
    <Switch>
      {routing}
      <Route path="*" component={NotFoundPage} />
    </Switch>
  </div>
);
