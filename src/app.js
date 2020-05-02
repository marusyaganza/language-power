import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from './components/header/header';
import { PATHS } from './constants/paths';
import { AppProvider } from './app-context/appContext';
import { Spinner } from './ui-elements/spinner/spinner';
import { PageContainer } from './components/page-container/page-container';
import ErrorBuondary from './components/error-boundary/error-boundary';
import './styles.css';

const Home = lazy(() => import('./pages/home-page'));
const NotFoundPage = lazy(() => import('./pages/not-found-page'));
const GamesPage = lazy(() => import('./pages/games-page'));
const CardPage = lazy(() => import('./pages/word-cards-page'));
const SearchPage = lazy(() => import('./pages/search-page'));

const navItems = Object.values(PATHS);

export const App = () => (
  <ErrorBuondary>
    <AppProvider>
      <PageContainer>
        <Header navItems={navItems} />
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/word_games" component={GamesPage} />
            <Route path="/word_cards" component={CardPage} />
            <Route path="/search_words" component={SearchPage} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Suspense>
      </PageContainer>
    </AppProvider>
  </ErrorBuondary>
);
