import React from 'react';
import ReactDOM from 'react-dom';
import { SearchPage } from './pages/search-page/search-page';
// import { HomePage } from './pages/home-page/homePage';
import { Header } from './components/header/header';
import './styles.css';
// TODO add react router to manage pages
const navLinks = [
  { label: 'search words', link: '/search_words' },
  { label: 'word cards', link: '/word_cards' }
];
const App = () => (
  <>
    <Header navItems={navLinks} />
    <SearchPage />
  </>
);
// ReactDOM.render(<SearchPage />, document.getElementById("root"));
ReactDOM.render(<App />, document.getElementById('root'));
