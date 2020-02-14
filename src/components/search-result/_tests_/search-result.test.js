import renderer from 'react-test-renderer';
import React from 'react';
import { SearchResult } from '../search-result';
import { data } from '../mock';

describe('SearchResult', () => {
  it('should match snapshot', () => {
    const component = renderer.create(<SearchResult word={data} />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
