import React from 'react';
import uuid from 'uuid';
import { reducer } from './reducer';
import { initialState } from './initialState';
import { ShowMore } from '../../components/show-more/show-more';
import { getSearchUrl } from './helpers';
import { useThunkReducer } from '../../utils/useThunkReducer';

import { SearchResult } from '../../components/search-result/search-result';
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
      if (result.suggestions) {
        return (
          <section className="search-results">
            <ShowMore title="suggestions" items={result.suggestions} />
          </section>
        );
      }
      if (result.length) {
        return (
          <section className="search-results">
            {result.map(item => (
              <ul>
                <li key={uuid()} className="list">
                  <SearchResult word={item} />
                </li>
              </ul>
            ))}
          </section>
        );
      }
      return (
        <section className="search-result">
          <div>No results</div>
        </section>
      );
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
