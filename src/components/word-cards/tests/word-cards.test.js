import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import '@testing-library/jest-dom';
import { WordCards } from '../word-cards';
import { AppProvider } from '../../../app-context/appContext';
import { mock, reqMock } from './word-cards.mock';
import { useFetch } from '../../../utils/hooks/fetch/useFetch';

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useContext: jest.fn()
  };
});

jest.mock('../../../utils/hooks/fetch/useFetch');

const fetchFunc = jest.fn();
const resetData = jest.fn();

describe('WordVards', () => {
  afterEach(cleanup);

  it('not render empty list of cards', () => {
    React.useContext.mockReturnValue({
      wordCards: {
        loading: false,
        error: false,
        result: []
      }
    });
    useFetch.mockReturnValue([{}, fetchFunc, resetData]);
    render(
      <AppProvider>
        <WordCards />
      </AppProvider>
    );

    expect(screen.getByText('You have added 0 cards')).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.queryByTestId('cards-list')).toBeNull();
  });
  it('should show spinner while loading', () => {
    React.useContext.mockReturnValue({
      wordCards: {
        loading: true,
        error: false,
        result: []
      }
    });
    render(
      <AppProvider>
        <WordCards />
      </AppProvider>
    );
    expect(screen.getByTestId('spinner-animation')).toBeInTheDocument();
  });
  it('should display error', () => {
    React.useContext.mockReturnValue({
      wordCards: {
        loading: false,
        error: { message: 'Cards error' },
        result: []
      }
    });
    render(
      <AppProvider>
        <WordCards />
      </AppProvider>
    );
    expect(screen.getByText('error: Cards error')).toBeInTheDocument();
  });

  it('should render cards', () => {
    const setIsModalOpen = jest.fn();
    const updateCards = jest.fn();
    React.useContext.mockReturnValue({
      wordCards: {
        loading: false,
        error: false,
        result: mock
      },
      setIsModalOpen,
      updateCards,
      token: 'token'
    });
    useFetch.mockReturnValue([
      { result: { message: 'deleted' } },
      fetchFunc,
      resetData
    ]);
    render(
      <AppProvider>
        <WordCards />
      </AppProvider>
    );

    expect(screen.getByText('You have added 2 cards')).toBeInTheDocument();

    fireEvent.click(screen.getByTitle('delete shoal card'));

    expect(screen.getByText('Cancel')).toHaveFocus();
    expect(setIsModalOpen).toHaveBeenCalledWith(true);

    fireEvent.click(screen.getByText('Cancel'));

    expect(setIsModalOpen).toHaveBeenCalledWith(false);

    fireEvent.click(screen.getByTitle('delete shoal card'));
    fireEvent.click(screen.getByText('Delete'));

    expect(updateCards).toHaveBeenCalled();
    expect(setIsModalOpen).toHaveBeenCalledWith(false);
    expect(fetchFunc).toHaveBeenCalledWith(reqMock);

    fireEvent.click(screen.getByTitle('delete broken card'));
    fireEvent.click(screen.getByText('Delete'));

    expect(fetchFunc).toHaveBeenCalledTimes(1);
  });

  it('should show spinner when deleting is in progress', () => {
    const setIsModalOpen = jest.fn();
    const updateCards = jest.fn();
    React.useContext.mockReturnValue({
      wordCards: {
        loading: false,
        error: false,
        result: mock
      },
      setIsModalOpen,
      updateCards,
      token: 'token'
    });
    useFetch.mockReturnValue([{ loading: true }, fetchFunc, resetData]);
    render(
      <AppProvider>
        <WordCards />
      </AppProvider>
    );

    expect(screen.getByTestId('spinner-animation')).toBeInTheDocument();
  });

  it('should handle error on delete', () => {
    const setIsModalOpen = jest.fn();
    const updateCards = jest.fn();
    React.useContext.mockReturnValue({
      wordCards: {
        loading: false,
        error: false,
        result: mock
      },
      setIsModalOpen,
      updateCards,
      token: 'token'
    });
    useFetch.mockReturnValue([
      { error: 'delete failed' },
      fetchFunc,
      resetData
    ]);
    render(
      <AppProvider>
        <WordCards />
      </AppProvider>
    );

    expect(screen.getByText('delete failed')).toBeInTheDocument();
    fireEvent.click(screen.getByText('OK'));
    expect(setIsModalOpen).toHaveBeenCalledWith(false);
  });
});
