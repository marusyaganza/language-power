import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';

import '@testing-library/jest-dom';
import { mock, reducedMock } from './word.mock';
import { WordCard } from '../word-card';
import { AppProvider } from '../../../app-context/appContext';

const buttonHandler = jest.fn();

describe('WordVards', () => {
  afterEach(cleanup);

  it('should show examples', () => {
    render(
      <AppProvider>
        <WordCard word={mock} />
      </AppProvider>
    );
    expect(screen.getByText('Example1')).not.toBeVisible();
    expect(screen.getByText('Example2')).not.toBeVisible();
    fireEvent.click(screen.getByText('Examples'));
    expect(screen.getByText('Example2')).toBeVisible();
    expect(screen.getByText('Example2')).toBeVisible();
  });
  it('should not show examples, defs, and pronunciation if data is null', () => {
    render(
      <AppProvider>
        <WordCard word={reducedMock} />
      </AppProvider>
    );

    expect(screen.queryByText('Examples')).toBeNull();
    expect(screen.queryByLabelText('book')).toBeNull();
    expect(screen.queryByLabelText('play audio')).toBeNull();
    expect(screen.queryByTestId('audio')).toBeNull();
    expect(screen.queryByTestId('defs')).toBeNull();
  });
  it('should render deleteButton', () => {
    render(
      <AppProvider>
        <WordCard word={reducedMock} deleteWord={buttonHandler} />
      </AppProvider>
    );

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(buttonHandler).toHaveBeenCalledWith('mockid');
  });
  it('should render addButton', () => {
    render(
      <AppProvider>
        <WordCard word={reducedMock} addWord={buttonHandler} />
      </AppProvider>
    );

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(buttonHandler).toHaveBeenCalledWith(reducedMock);
  });
  it('should disable addButton if card was added', () => {
    render(
      <AppProvider>
        <WordCard word={reducedMock} addWord={buttonHandler} isAdded />
      </AppProvider>
    );

    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
  });
  it('should render transcription if audiourl is not present', () => {
    const transcription = 'ˈʃoʊl';
    const newMock = {
      ...reducedMock,
      pronunciation: { audioUrl: null, transcription }
    };
    render(
      <AppProvider>
        <WordCard word={newMock} addWord={buttonHandler} />
      </AppProvider>
    );

    expect(screen.queryByLabelText('play audio')).toBeNull();
    expect(screen.getByText(`[${transcription}]`)).toBeInTheDocument();
  });
});
