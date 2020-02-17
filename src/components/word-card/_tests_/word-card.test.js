import renderer from 'react-test-renderer';
import React from 'react';
import { WordCard } from '../word-card';
import { wordCardsMock } from '../../../../mocks/word-cards.mock';

describe('SearchResult', () => {
  it('should match snapshot', () => {
    const component = renderer
      .create(<WordCard word={wordCardsMock[0]} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
