import React, { useContext } from 'react';
import './word-cards.css';
import { WordCard } from '../word-card/word-card';
import { WordContext } from '../../widgets/words/WordContext';

export const WordCards = () => {
  const { words, onCheck } = useContext(WordContext);
  return (
    <section className="word-cards">
      <h2 className="words-heading">
        Words: <em className="word-count">{words.length}</em>
      </h2>
      {words.map(word => (
        <WordCard key={word.id} word={word} onCheck={onCheck} />
      ))}
    </section>
  );
};
