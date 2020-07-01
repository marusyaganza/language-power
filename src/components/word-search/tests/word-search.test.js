import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { WordSearch } from '../word-search';
import { AppProvider } from '../../../app-context/appContext';
import { useFetch } from '../../../utils/hooks/fetch/useFetch';

import { fullResult, result, suggestions } from './word-search.mock';

jest.mock('../../../utils/hooks/fetch/useFetch');
const addWord = jest.fn();
const fetchFunc = jest.fn();
const resetData = jest.fn();

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useContext: jest.fn()
  };
});

describe('WordSearch', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should render error', () => {
    useFetch.mockReturnValue([
      { error: { message: 'Dummy error' } },
      fetchFunc,
      resetData
    ]);
    React.useContext.mockReturnValue({
      wordCards: {
        loading: false,
        error: { message: 'wordcards error' },
        result: null
        // result: [{ uuid: 'uuid2' }, { uuid: 'uuid1' }]
      }
    });
    render(
      <AppProvider>
        <WordSearch />
      </AppProvider>
    );
    expect(screen.getByText('Dummy error')).toBeInTheDocument();
    // expect(screen.getByText('wordcards error')).toBeInTheDocument();
  });

  it('should render spinner', () => {
    useFetch.mockReturnValue([{ loading: true }, fetchFunc, resetData]);
    React.useContext.mockReturnValue({
      wordCards: {
        loading: false,
        error: false,
        result: []
      }
    });
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
    React.useContext.mockReturnValue({
      wordCards: {
        loading: false,
        error: false,
        result: []
      }
    });
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
      url: 'undefined/api/words/search/shoal'
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
    React.useContext.mockReturnValue({
      wordCards: {
        loading: false,
        error: false,
        result: []
      }
    });
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
    React.useContext.mockReturnValue({
      wordCards: {
        loading: false,
        error: false,
        result: []
      }
    });
    render(
      <AppProvider>
        <WordSearch addWord={addWord} />
      </AppProvider>
    );
    expect(screen.queryByTestId('search-result')).toBeNull();
  });

  it('should render result', () => {
    useFetch.mockReturnValue([{ result: fullResult }, fetchFunc, resetData]);
    React.useContext.mockReturnValue({
      wordCards: {
        loading: false,
        error: false,
        result: [{ uuid: 'uuid2' }]
      }
    });
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
