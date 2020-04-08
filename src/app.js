import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from './components/header/header';
import styles from './styles.css';
import { NotFoundPage } from './pages/not-found-page/not-found-page';
import { PATHS } from './constants/paths';
import { PAGES } from './constants/pages';
import { AppProvider } from './app-context/appContext';

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
  return null;
});
// TODO create component for main
export const App = () => (
  <AppProvider>
    <div className="page">
      <Header navItems={navItems} />
      <main className={styles.main}>
        <Switch>
          {routing}
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </main>
    </div>
  </AppProvider>
);
