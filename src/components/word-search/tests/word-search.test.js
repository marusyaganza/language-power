import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';

import '@testing-library/jest-dom';
import { WordSearch } from '../word-search';
import { AppProvider } from '../../../app-context/appContext';
import { useFetch } from '../../../utils/hooks/fetch/useFetch';

import { fullResult, result, suggestions } from './word-search.mock';

jest.mock('../../../utils/hooks/fetch/useFetch');
const addWord = jest.fn();
const fetchFunc = jest.fn();
const resetData = jest.fn();

describe('WordSearch', () => {
  afterEach(cleanup);

  it('should render error', () => {
    useFetch.mockReturnValue([
      { error: { message: 'Dummy error' } },
      fetchFunc,
      resetData
    ]);
    render(
      <AppProvider>
        <WordSearch />
      </AppProvider>
    );
    expect(screen.getByText('Dummy error')).toBeInTheDocument();
  });

  it('should render spinner', () => {
    useFetch.mockReturnValue([{ loading: true }, fetchFunc, resetData]);
    render(
      <AppProvider>
        <WordSearch />
      </AppProvider>
    );

    const spinner = screen.getByText('Loading...');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('role', 'alert');
    expect(screen.getByTestId('spinner-animation')).toBeInTheDocument();
  });

  it('should render suggestions', () => {
    useFetch.mockReturnValue([{ result: suggestions }, fetchFunc, resetData]);
    render(
      <AppProvider>
        <WordSearch addWord={addWord} />
      </AppProvider>
    );

    fireEvent.input(screen.getByLabelText('type word to look up'), {
      target: { value: 'shoal' }
    });
    fireEvent.click(screen.getByText('Search'));

    expect(fetchFunc).toHaveBeenCalledWith({
      url: 'host/api/words/search/shoal'
    });
    expect(screen.getByText('May be you meant')).toBeInTheDocument();
    expect(screen.getByText('No words found')).toBeInTheDocument();
    expect(screen.getByLabelText('lost-in-space')).toBeInTheDocument();
    expect(screen.getByTestId('content')).toHaveTextContent(
      'suggestion1, suggestion2'
    );
  });

  it('should handle empty result', () => {
    useFetch.mockReturnValue([{ result }, fetchFunc, resetData]);
    render(
      <AppProvider>
        <WordSearch addWord={addWord} />
      </AppProvider>
    );

    expect(screen.getByText('No words found')).toBeInTheDocument();
    expect(screen.getByLabelText('lost-in-space')).toBeInTheDocument();
  });

  it('should handle no result', () => {
    useFetch.mockReturnValue([{ result: null }, fetchFunc, resetData]);

    render(
      <AppProvider>
        <WordSearch addWord={addWord} />
      </AppProvider>
    );

    expect(screen.queryByTestId('search-result')).toBeNull();
  });

  it('should render result', () => {
    useFetch.mockReturnValue([{ result: fullResult }, fetchFunc, resetData]);

    render(
      <AppProvider>
        <WordSearch addWord={addWord} />
      </AppProvider>
    );

    expect(screen.getByTestId('search-result')).toBeInTheDocument();
    expect(screen.getByText('Results for')).toBeInTheDocument();
    expect(screen.getByLabelText('astronaut')).toBeInTheDocument();
    expect(screen.getByLabelText('meteor')).toBeInTheDocument();
    expect(screen.getByText('Related words')).toBeInTheDocument();

    fireEvent.click(screen.getByTitle('add shoal to cards'));

    expect(addWord).toHaveBeenCalledWith(fullResult.match[0]);
  });
});
