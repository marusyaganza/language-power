import React, { useState, memo, useContext } from 'react';
import { WordContext } from '../../widgets/words/WordContext';

import './new-word.css';

// TODO add validation
export const NewWord = memo(() => {
  const { onSubmit } = useContext(WordContext);
  const [word, setWord] = useState('');
  const [def, setDef] = useState('');

  const resetInputs = () => {
    setDef('');
    setWord('');
  };

  const handleChange = event => {
    event.preventDefault();
    onSubmit({ text: word, def });
    resetInputs();
  };

  return (
    <form onSubmit={handleChange} className="word-form">
      <input
        className="word-input"
        placeholder="word"
        type="text"
        value={word}
        onChange={event => setWord(event.target.value)}
      />
      <input
        className="word-input"
        placeholder="definition"
        type="text"
        value={def}
        onChange={event => setDef(event.target.value)}
      />
      <button className="add-word" type="submit">
        Add word
      </button>
    </form>
  );
});
