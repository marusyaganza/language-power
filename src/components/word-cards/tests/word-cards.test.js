import React from 'react';
import {
  render,
  screen,
  fireEvent,
  cleanup,
  act
} from '@testing-library/react';

import '@testing-library/jest-dom';
import { WordCards } from '../word-cards';
import { AppProvider } from '../../../app-context/appContext';
import { mock, reqMock, reqDeleteMock } from './word-cards.mock';

import { mockStarageValues } from '../../../../mocks/mockStarageValues';

const label = 'delete shoal card';

describe('WordVards', () => {
  afterEach(cleanup);
  beforeAll(() => {
    jest.useFakeTimers();
    mockStarageValues();
  });
  afterAll(() => {
    jest.useRealTimers();
  });
  beforeEach(() => {
    fetch.mockClear();
  });

  it('not render empty list of cards', async () => {
    fetch.mockResponse(JSON.stringify([]), {
      status: 200
    });
    render(
      <AppProvider>
        <WordCards />
      </AppProvider>
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(
      await screen.findByText('You have added 0 cards')
    ).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.queryByTestId('cards-list')).toBeNull();
  });

  it('should display error', async () => {
    const message = 'Cards error';
    fetch.mockResponse(JSON.stringify({ message }), {
      status: 500
    });
    render(
      <AppProvider>
        <WordCards />
      </AppProvider>
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(await screen.findByText(`error: ${message}`)).toBeInTheDocument();
  });

  it.skip('should render cards', async () => {
    const message = 'card removed';
    fetch.mockResponses(
      [
        JSON.stringify(mock),
        {
          status: 200
        }
      ],
      [JSON.stringify({ message }), { status: 202 }],
      [
        JSON.stringify([mock[1]]),
        {
          status: 200
        }
      ]
    );

    render(
      <AppProvider>
        <WordCards />
      </AppProvider>
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(fetch.mock.calls.length).toBe(1);
    expect(fetch).toHaveBeenCalledWith(reqMock.url, reqMock.requestOptions);
    expect(screen.getByTestId('spinner-animation')).toBeInTheDocument();
    expect(
      await screen.findByText('You have added 2 cards')
    ).toBeInTheDocument();

    fireEvent.click(screen.getByTitle(label));

    expect(screen.getByText('Cancel')).toHaveFocus();

    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(fetch.mock.calls.length).toBe(1);

    fireEvent.click(screen.getByTitle('delete broken card'));
    fireEvent.click(screen.getByText('Delete'));

    expect(fetch.mock.calls.length).toBe(1);

    fireEvent.click(screen.getByTitle(label));
    fireEvent.click(screen.getByText('Delete'));
    expect(fetch.mock.calls.length).toBe(2);
    expect(fetch).toHaveBeenCalledWith(
      reqDeleteMock.url,
      reqDeleteMock.requestOptions
    );
    expect(screen.getByTestId('spinner-animation')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(
      await screen.findByText('You have added 1 cards')
    ).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
    fireEvent.click(screen.getByText('OK'));
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(fetch).toHaveBeenCalledWith(reqMock.url, reqMock.requestOptions);
  });

  it.skip('should handle error on delete', async () => {
    fetch.mockResponses(
      [
        JSON.stringify(mock),
        {
          status: 200
        }
      ],
      [JSON.stringify('deleting error'), { status: 500 }],
      [
        JSON.stringify([mock[1]]),
        {
          status: 200
        }
      ]
    );

    render(
      <AppProvider>
        <WordCards />
      </AppProvider>
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(
      await screen.findByText('You have added 2 cards')
    ).toBeInTheDocument();

    fireEvent.click(screen.getByTitle(label));
    fireEvent.click(screen.getByText('Delete'));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(await screen.findByText('deleting error')).toBeInTheDocument();
  });
});
