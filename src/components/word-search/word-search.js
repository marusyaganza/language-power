import React, { useContext, useState, useEffect, Suspense } from 'react';
import PropTypes from 'prop-types';

import { ShowMore } from '../show-more/show-more';
import { useFetch } from '../../utils/hooks/fetch/useFetch';
import { SearchForm } from '../search-form/search-form';
import { AppContext } from '../../app-context/appContext';
import { Spinner } from '../../ui-elements/spinner/spinner';
import { searchUrl } from '../../constants/urls';
import { Icon } from '../../ui-elements/icons/icon';
import styles from './word-search.css';
import commonStyles from '../../assets/styles/common-styles.css';
import { ErrorContainer } from '../../ui-elements/error-container/error-container';

import { WordCard } from '../word-card/word-card';

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
          const isAdded = Array.isArray(wordCards.result)
            ? wordCards.result.some(i => i.uuid === item.uuid)
            : false;
          return (
            <li key={item.uuid}>
              <Suspense fallback={<Spinner />}>
                <WordCard word={item} isAdded={isAdded} addWord={addWord} />
              </Suspense>
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
      return <ErrorContainer>{error.message}</ErrorContainer>;
    }
    if (result) {
      const { suggestions, match, related } = result;
      return (
        <article data-testid="search-result">
          <section>
            <h2 className={commonStyles.subheading}>
              <Icon className={styles.red} id="meteor" /> Results for{' '}
              <i>{query}</i>
            </h2>
            {match.length ? (
              renderResultArray(match)
            ) : (
              <div className={styles.noResults}>
                <Icon
                  id="lost-in-space"
                  width={50}
                  height={50}
                  className={styles.purple}
                />
                <p className={styles.text}>No words found</p>
              </div>
            )}
          </section>
          {suggestions.length ? (
            <ShowMore
              className={styles.text}
              title="May be you meant "
              items={suggestions}
            />
          ) : null}
          {related.length ? (
            <section>
              <h2 className={commonStyles.subheading}>
                <Icon id="astronaut" className={styles.purple} /> Related words
              </h2>
              {renderResultArray(related)}
            </section>
          ) : null}
        </article>
      );
    }
    return null;
  };
  return (
    <section className={commonStyles.container}>
      <SearchForm onFormSubmit={handleSearchSubmit} />
      {renderResult()}
    </section>
  );
};

WordSearch.propTypes = {
  addWord: PropTypes.func.isRequired
};
