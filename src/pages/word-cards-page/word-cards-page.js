import React from 'react';
import { WordCards } from '../../components/word-cards/word-cards';
import commonStyles from '../../assets/styles/common-styles.css';

export const WordCardsPage = () => {
  return (
    <div className={commonStyles.container}>
      <h1 className={commonStyles.mainHeading}>Word cards</h1>
      <WordCards />
    </div>
  );
};
