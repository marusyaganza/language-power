import React from 'react';
import PropTypes from 'prop-types';
import { cleanString, isSuff } from './helpers';
import { CLOSING, OPENING } from './constants';
import './dictionary-entity.css';

export const DictionaryEntity = ({ text, className }) => {
  const decorateWord = word => {
    return <i className={className}> {word} </i>;
  };

  const counstuctPhrase = string => {
    const arr = string.split(' ');
    let italicPhrase = [];
    let normalPhrase = [];
    const result = [];
    let phraseOpen = false;
    arr.forEach(word => {
      const formattedWord = cleanString(`${word} `);
      if (isSuff(word, OPENING)) {
        phraseOpen = true;
        result.push(normalPhrase.join(''));
        normalPhrase = [];
      }
      if (isSuff(word, CLOSING)) {
        phraseOpen = false;
        italicPhrase.push(formattedWord);
        result.push(decorateWord(italicPhrase.join('')));
        italicPhrase = [];
      } else if (phraseOpen) {
        italicPhrase.push(formattedWord);
      } else {
        normalPhrase.push(formattedWord);
      }
    });
    result.push(normalPhrase.join(''));
    return result;
  };
  return <>{counstuctPhrase(text)}</>;
};

DictionaryEntity.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string
};

DictionaryEntity.defaultProps = {
  text: '',
  className: 'info'
};
