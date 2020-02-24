import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './search-form.css';

export const SearchForm = ({ onFormSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    event.preventDefault();
    setQuery(event.target.value);
  };

  const handleSearchSubmit = e => {
    e.preventDefault();
    onFormSubmit(query);
    setQuery('');
  };
  // TODO extract button component
  return (
    <form onSubmit={handleSearchSubmit} className={SearchForm}>
      <input
        className={styles.searchInput}
        onChange={handleChange}
        placeholder="word"
        value={query}
        type="text"
      />
      <button className={styles.searchButton} type="submit">
        Search
      </button>
    </form>
  );
};

SearchForm.propTypes = {
  onFormSubmit: PropTypes.func
};

SearchForm.defaultProps = {
  onFormSubmit: () => {}
};
