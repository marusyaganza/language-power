import React, { useContext } from 'react';
import './word-cards.css';
import { WordCard } from '../word-card/word-card';
import { AppContext } from '../../app-context/appContext';

export const WordCards = () => {
  const { wordCards, deleteWord } = useContext(AppContext);
  return (
    <section className="word-cards">
      <h2 className="words-heading">
        Words: <em className="word-count">{wordCards.length}</em>
      </h2>
      {wordCards.map(word => (
        <WordCard key={word.uuid} word={word} deleteWord={deleteWord} />
      ))}
    </section>
  );
};
