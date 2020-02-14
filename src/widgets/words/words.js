import React from 'react';
import PropTypes from 'prop-types';
import { NewWord } from '../../components/new-word/new-word';
import { WordCards } from '../../components/word-cards/word-cards';
import { WordProvider } from './WordContext';
import './words.css';

// TODO maybe move application content to another file
export const Words = ({ initialState }) => {
  return (
    <WordProvider initialState={initialState}>
      <div className="words">
        <NewWord />
        <WordCards />
      </div>
    </WordProvider>
  );
};

Words.propTypes = {
  initialState: PropTypes.array
};

Words.defaultProps = {
  initialState: []
};
