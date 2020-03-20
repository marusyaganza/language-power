import React from 'react';
import { WordCards } from '../../components/word-cards/word-cards';
import styles from './word-cards-page.css';

export const WordCardsPage = () => {
  return (
    <main>
      <h1 className={styles.mainHeading}>Word cards</h1>
      <WordCards />
    </main>
  );
};
