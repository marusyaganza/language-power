// Registrate new pages here
// Add pages routes in './path.js

import { HomePage } from '../pages/home-page/homePage';
import { SearchPage } from '../pages/search-page/search-page';
import { WordCardsPage } from '../pages/word-cards/word-cards';
import { WordGamesPage } from '../pages/word-games/word-games';

export const PAGES = {
  HOME: HomePage,
  SEARCH_WORDS: SearchPage,
  WORD_CARDS: WordCardsPage,
  WORD_GAMES: WordGamesPage
};
