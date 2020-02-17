import renderer from 'react-test-renderer';
import React from 'react';
import { SearchResult } from '../search-result';
import { wordCardsMock } from '../../../../mocks/word-cards.mock';

describe('SearchResult', () => {
  it('should match snapshot', () => {
    const component = renderer
      .create(<SearchResult word={wordCardsMock[0]} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
