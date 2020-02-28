import React from 'react';
import { WordCards } from '../../components/word-cards/word-cards';
import '../../components/word-cards/word-cards.css';

export const WordCardsPage = () => {
  return (
    <main>
      <h1 className="main-heading">Word cards</h1>
      <WordCards />
    </main>
  );
};
