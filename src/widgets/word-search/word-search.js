import React, { useState } from 'react';
import { RESPONSE_ERROR, RESPONSE_COMPLETE, FETCHING } from './actions';
import { reducer } from './reducer';
import { initialState } from './initialState';
import { ShowMore } from '../../components/show-more/show-more';
import { getSearchUrl } from './helpers';
import { useThunkReducer } from './thunkReducer';
import './word-search.css';

import { SearchResult } from '../../components/search-result/search-result';

export const WordSearch = () => {
  const [query, setQuery] = useState('');
  const [state, dispatch] = useThunkReducer(reducer, initialState);
  const { result, loading, error } = state;
  const useFetch = url => {
    dispatch({
      type: FETCHING
    });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        dispatch({
          type: RESPONSE_COMPLETE,
          payload: {
            res,
            query
          }
        });
      })
      .catch(e => {
        dispatch({
          type: RESPONSE_ERROR,
          payload: {
            error: e
          }
        });
      });
  };

  const handleChange = event => {
    event.preventDefault();
    setQuery(event.target.value);
  };

  const handleSearchSubmit = e => {
    e.preventDefault();
    useFetch(getSearchUrl(query));
  };
  // TODO refactor this
  const renderResult = resultArr => {
    if (!resultArr) return null;
    if (resultArr.suggestions) {
      return (
        <section className="search-results">
          <ShowMore title="suggestions" items={resultArr.suggestions} />
        </section>
      );
    }
    if (!resultArr.length) {
      return (
        <section>
          <div>No results</div>
        </section>
      );
    }
    return (
      <section className="search-results">
        {resultArr && resultArr.map(item => <SearchResult word={item} />)}
      </section>
    );
  };
  return (
    <section className="word-search">
      {loading && <div> Loading... </div>}
      {error && <div> {error} </div>}
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          className="search-input"
          onChange={handleChange}
          placeholder="word"
          value={query}
          type="text"
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      {/* <section className="search-results"> */}
      {/*  {result && result.map(item => <SearchResult word={item} />)} */}
      {/* </section> */}
      {renderResult(result)}
    </section>
  );
};
