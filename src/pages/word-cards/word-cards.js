import React from 'react';
import { Words } from '../../widgets/words/words';
import { wordCardsMock } from '../../../mocks/word-cards.mock';

export const WordCardsPage = () => {
  return (
    <main>
      <h1 className="main-heading">Word cards</h1>
      <Words initialState={wordCardsMock} />
    </main>
  );
};
