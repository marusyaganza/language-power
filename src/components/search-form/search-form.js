import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './search-form.css';

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
  );
};

SearchForm.propTypes = {
  onFormSubmit: PropTypes.func
};

SearchForm.defaultProps = {
  onFormSubmit: () => {}
};
