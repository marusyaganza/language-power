import React, { useContext, useState, useEffect, Suspense } from 'react';
import PropTypes from 'prop-types';

import { ShowMore } from '../show-more/show-more';
import { useFetch } from '../../utils/hooks/fetch/useFetch';
import { SearchForm } from '../search-form/search-form';
import { AppContext } from '../../app-context/appContext';
import { Spinner } from '../../ui-elements/spinner/spinner';
import { searchUrl } from '../../constants/urls';
import styles from './word-search.css';

const WordCard = React.lazy(() =>
  import(/* webpackPreload: true */ '../word-card')
);

export const WordSearch = ({ addWord }) => {
  const { wordCards } = useContext(AppContext);
  const [state, sendRequest] = useFetch();
  const { result, loading, error } = state;
  const [query, setQuery] = useState('');

  const handleSearchSubmit = inputQuery => {
    setQuery(inputQuery);
  };

  useEffect(() => {
    if (query) {
      const url = searchUrl + query;
      sendRequest({ url });
    }
  }, [query]);
  const renderResultArray = arr => {
    return (
      <ul>
        {arr.map(item => {
          const isAdded = wordCards.result.some(i => i.uuid === item.uuid);
          return (
            <li key={item.uuid}>
              <WordCard word={item} isAdded={isAdded} addWord={addWord} />
            </li>
          );
        })}
      </ul>
    );
  };

  const renderResult = () => {
    if (loading || wordCards.loading) {
      return <Spinner />;
    }
    if (error) {
      return <div> {error.message} </div>;
    }
    if (result) {
      const { suggestions, match, related } = result;
      return (
        <article>
          {suggestions.length ? (
            <ShowMore title="suggestions" items={suggestions} />
          ) : null}
          <section>
            <h2>Results</h2>
            {match.length ? (
              renderResultArray(match)
            ) : (
              <div>No words found</div>
            )}
          </section>
          {related.length ? (
            <section>
              <h2>Related words</h2>
              {renderResultArray(related)}
            </section>
          ) : null}
        </article>
      );
    }
    return null;
  };
  return (
    <section className={styles.wordSearch}>
      <SearchForm onFormSubmit={handleSearchSubmit} />
      <Suspense fallback={<Spinner />}>{renderResult()}</Suspense>
    </section>
  );
};

WordSearch.propTypes = {
  addWord: PropTypes.func.isRequired
};
