import React from 'react';
import uuid from 'uuid';
import { reducer } from './reducer';
import { initialState } from './initialState';
import { ShowMore } from '../../components/show-more/show-more';
import { getSearchUrl } from './helpers';
import { useThunkReducer } from '../../utils/useThunkReducer';

import { WordCard } from '../../components/word-card/word-card';
import { useFetch } from '../../utils/useFetch';
import { SearchForm } from '../../components/search-form/search-form';

export const WordSearch = () => {
  const [state, dispatch] = useThunkReducer(reducer, initialState);
  const { result, loading, error } = state;

  const handleSearchSubmit = query => {
    const url = getSearchUrl(query);
    useFetch({ url, query, dispatch });
  };

  const renderResult = () => {
    if (loading) {
      return <div> Loading... </div>;
    }
    if (error) {
      return <div> {error.message} </div>;
    }
    if (result) {
      let resultContent = <div>No results</div>;
      if (result.suggestions) {
        resultContent = (
          <ShowMore title="suggestions" items={result.suggestions} />
        );
      }
      if (result.length) {
        resultContent = result.map(item => (
          <ul>
            <li key={uuid()} className="list">
              <WordCard word={item} />
            </li>
          </ul>
        ));
      }
      return <section className="search-result">{resultContent}</section>;
    }
    return null;
  };
  return (
    <section className="word-search">
      <SearchForm onFormSubmit={handleSearchSubmit} />
      {renderResult()}
    </section>
  );
};
