import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from './components/header/header';
import styles from './styles.css';
import { PATHS } from './constants/paths';
import { AppProvider } from './app-context/appContext';
import { Spinner } from './ui-elements/spinner/spinner';

const Home = lazy(() => import('./pages/home-page'));
const NotFoundPage = lazy(() => import('./pages/not-found-page'));
const GamesPage = lazy(() => import('./pages/games-page'));
const CardPage = lazy(() => import('./pages/word-cards-page'));
const SearchPage = lazy(() => import('./pages/search-page'));

const navItems = Object.values(PATHS);

export const App = () => (
  <AppProvider>
    <div className={styles.page}>
      <Header navItems={navItems} />
      <main className={styles.main}>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/word_games" component={GamesPage} />
            <Route path="/word_cards" component={CardPage} />
            <Route path="/search_words" component={SearchPage} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Suspense>
      </main>
    </div>
  </AppProvider>
);
