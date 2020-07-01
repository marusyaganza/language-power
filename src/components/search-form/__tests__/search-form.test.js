import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchForm } from '../search-form';

const submitFunc = jest.fn();

describe('Search Form', () => {
  afterEach(cleanup);

  it('should not submit empty query', () => {
    render(<SearchForm onFormSubmit={submitFunc} />);
    const button = screen.getByText('Search');
    fireEvent.click(button);
    expect(submitFunc).toHaveBeenCalledTimes(0);
  });
  it('submit query', () => {
    render(<SearchForm onFormSubmit={submitFunc} />);

    const input = screen.getByLabelText('type word to look up');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'query' } });
    fireEvent.click(button);
    expect(submitFunc).toHaveBeenCalledWith('query');
  });
  it('should not fail if submit func is not present', () => {
    render(<SearchForm />);
    const button = screen.getByText('Search');
    const input = screen.getByLabelText('type word to look up');
    fireEvent.change(input, { target: { value: 'query' } });
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });
});
