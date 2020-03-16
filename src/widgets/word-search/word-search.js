import React, { useContext } from 'react';
import { reducer } from './reducer';
import { initialState } from './initialState';
import { ShowMore } from '../../components/show-more/show-more';
import { getSearchUrl } from './helpers';
import { useThunkReducer } from '../../utils/useThunkReducer';

import { WordCard } from '../../components/word-card/word-card';
import { useFetch } from '../../utils/useFetch';
import { SearchForm } from '../../components/search-form/search-form';
import { AppContext } from '../../app-context/appContext';
import styles from './word-search.css';

export const WordSearch = () => {
  const { wordCards, addWord } = useContext(AppContext);
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
        resultContent = (
          <ul>
            {result.map(item => {
              const isAdded = wordCards.some(i => i.uuid === item.uuid);
              return (
                <li key={item.uuid}>
                  <WordCard word={item} isAdded={isAdded} addWord={addWord} />
                </li>
              );
            })}
          </ul>
        );
      }
      return <section className="search-result">{resultContent}</section>;
    }
    return null;
  };
  return (
    <section className={styles.wordSearch}>
      <SearchForm onFormSubmit={handleSearchSubmit} />
      {renderResult()}
    </section>
  );
};
