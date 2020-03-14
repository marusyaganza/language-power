import React, { useContext } from 'react';
import styles from './word-cards.css';
import { WordCard } from '../word-card/word-card';
import { AppContext } from '../../app-context/appContext';

export const WordCards = () => {
  const { wordCards, deleteWord } = useContext(AppContext);
  return (
    <section>
      <h2 className={styles.wordsHeading}>
        You have added {wordCards.length} cards
      </h2>
      {wordCards.map(word => (
        <WordCard key={word.uuid} word={word} deleteWord={deleteWord} />
      ))}
    </section>
  );
};
