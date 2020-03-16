import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './search-form.css';
import { Input } from '../input/input';
import { Button } from '../buttons/button/button';

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

  return (
    <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
      <Input
        className={styles.searchInput}
        name="searchInput"
        onChange={handleChange}
        placeholder="word"
        value={query}
        label="type word to look up"
      />
      <Button type="submit" size="XL">
        Search
      </Button>
    </form>
  );
};

SearchForm.propTypes = {
  onFormSubmit: PropTypes.func
};

SearchForm.defaultProps = {
  onFormSubmit: () => {}
};
