import React from 'react';
import { WordCards } from '../../components/word-cards/word-cards';
import styles from './word-cards-page.css';
import commonStyles from '../../assets/styles/common-styles.css';

export const WordCardsPage = () => {
  return (
    <div className={commonStyles.container}>
      <h1 className={styles.mainHeading}>Word cards</h1>
      <WordCards />
    </div>
  );
};
