import React, { memo } from 'react';
import './word-card.css';
import PropTypes from 'prop-types';

export const WordCard = memo(({ word, onCheck }) => {
  const { text, def, learnt, id } = word;
  const learn = () => {
    onCheck(id);
  };
  const inputId = `checkbox-${id}`;
  const inputName = `${text}-checkbox`;

  return (
    <article className="word-card">
      <h3>{text}</h3>
      <p>{def}</p>
      <div className="word-controls">
        <label htmlFor={inputId} className="word-learnt">
          learnt
        </label>
        <input
          name={inputName}
          id={inputId}
          type="checkbox"
          checked={learnt}
          onChange={learn}
        />
      </div>
    </article>
  );
});

WordCard.propTypes = {
  word: PropTypes.string.isRequired,
  onCheck: PropTypes.func
};

WordCard.defaultProps = {
  onCheck: null
};
