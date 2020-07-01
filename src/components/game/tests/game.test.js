import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

import {
  config,
  gameData,
  finishTexts,
  finishTexts2,
  gameDataEmpty
} from './game.mock';
import { useFetch } from '../../../utils/hooks/fetch/useFetch';
import { MESSAGES } from '../game-engine/config';

import { Game } from '../game';

import { AppProvider } from '../../../app-context/appContext';

jest.mock('../../../utils/hooks/fetch/useFetch');
const handler = jest.fn();
const fetchFunc = jest.fn();
const resetData = jest.fn();

const finishButtonText = 'Finish game';

describe('Game', () => {
  afterEach(cleanup);
  it('should handle loading', () => {
    useFetch.mockReturnValue([{ loading: true }, fetchFunc, resetData]);
    render(
      <AppProvider>
        <Game config={config.audio} closeHandler={handler} gameId="audio" />
      </AppProvider>
    );
    const spinner = screen.getByText('Loading...');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('role', 'alert');
    expect(screen.getByTestId('spinner-animation')).toBeInTheDocument();
  });
  it('should handle error', () => {
    useFetch.mockReturnValue([{ error: 'Dummy error' }, fetchFunc, resetData]);
    render(
      <AppProvider>
        <Game config={config.audio} closeHandler={handler} gameId="audio" />
      </AppProvider>
    );
    expect(screen.getByText('Dummy error')).toBeInTheDocument();
  });
  it('should render audio game', () => {
    useFetch.mockReturnValue([
      { result: gameData.audio },
      fetchFunc,
      resetData
    ]);

    const spy = jest.spyOn(global.window.Audio.prototype, 'play');
    render(
      <AppProvider>
        <Game config={config.audio} closeHandler={handler} gameId="audio" />
      </AppProvider>
    );
    const answerInput = screen.getByRole('textbox');
    const checkButton = screen.getByText('Check');
    fireEvent.input(answerInput, {
      target: { value: 'bad' }
    });
    fireEvent.click(checkButton);
    expect(screen.getByText(MESSAGES.error)).toBeInTheDocument();
    fireEvent.input(answerInput, {
      target: { value: 'bodily' }
    });
    fireEvent.click(checkButton);
    expect(screen.getByText(MESSAGES.complete)).toBeInTheDocument();
    finishTexts.forEach(text => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
    const finishButton = screen.getByText(finishButtonText);
    fireEvent.click(finishButton);
    expect(fetchFunc).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalled();
  });
  it('should render writing game', () => {
    useFetch.mockReturnValue([
      { result: gameData.writing },
      fetchFunc,
      resetData
    ]);

    render(
      <AppProvider>
        <Game config={config.writing} closeHandler={handler} gameId="writing" />
      </AppProvider>
    );
    const answerInput = screen.getByRole('textbox');
    const checkButton = screen.getByText('Check');
    fireEvent.input(answerInput, {
      target: { value: 'bad' }
    });
    fireEvent.click(checkButton);
    expect(screen.getByText(MESSAGES.error)).toBeInTheDocument();
    fireEvent.input(answerInput, {
      target: { value: 'syllabic' }
    });
    fireEvent.click(checkButton);
    fireEvent.input(answerInput, {
      target: { value: 'spew' }
    });
    fireEvent.click(checkButton);
    expect(screen.getByText(MESSAGES.complete)).toBeInTheDocument();
    finishTexts2.forEach(text => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
    const finishButton = screen.getByText(finishButtonText);
    fireEvent.click(finishButton);
    expect(fetchFunc).toHaveBeenCalledTimes(2);
  });

  it('should render findAllDefs game', () => {
    useFetch.mockReturnValue([
      { result: gameData.findAllDefs },
      fetchFunc,
      resetData
    ]);

    render(
      <AppProvider>
        <Game
          config={config.findAllDefs}
          closeHandler={handler}
          gameId="findAllDefs"
        />
      </AppProvider>
    );
    const checkButton = screen.getByText('Check');
    fireEvent.click(
      screen.getByLabelText(
        'to cause (something) to flow out in a fast and forceful way'
      )
    );
    fireEvent.click(checkButton);
    expect(screen.getByText(MESSAGES.error)).toBeInTheDocument();
    fireEvent.click(
      screen.getByLabelText(
        'to flow out of something in a fast and forceful way'
      )
    );
    fireEvent.click(checkButton);
    expect(screen.getByText(MESSAGES.complete)).toBeInTheDocument();
    finishTexts.forEach(text => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
    const finishButton = screen.getByText(finishButtonText);
    fireEvent.click(finishButton);
    expect(fetchFunc).toHaveBeenCalledTimes(2);
  });

  it('should render definitionWord game', () => {
    useFetch.mockReturnValue([
      { result: gameData.definitionWord },
      fetchFunc,
      resetData
    ]);

    render(
      <AppProvider>
        <Game
          config={config.definitionWord}
          closeHandler={handler}
          gameId="definitionWord"
        />
      </AppProvider>
    );
    const checkButton = screen.getByText('Check');

    fireEvent.click(screen.getByLabelText('bodily'));
    fireEvent.click(checkButton);

    expect(screen.getByText(MESSAGES.error)).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('syllable'));
    fireEvent.click(checkButton);

    expect(screen.getByText(MESSAGES.complete)).toBeInTheDocument();
    finishTexts.forEach(text => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
    const finishButton = screen.getByText(finishButtonText);

    fireEvent.click(finishButton);
    expect(fetchFunc).toHaveBeenCalledTimes(2);
  });

  it('should handle empty gamedata', () => {
    useFetch.mockReturnValue([{ result: gameDataEmpty }, fetchFunc, resetData]);
    render(
      <BrowserRouter>
        <AppProvider>
          <Game config={config.audio} closeHandler={handler} gameId="audio" />
        </AppProvider>
      </BrowserRouter>
    );
    expect(
      screen.getByText('All words are learnt, congrats!')
    ).toBeInTheDocument();
    expect(screen.getByText('Add new words')).toHaveAttribute(
      'href',
      '/search_words'
    );
    expect(fetchFunc).toHaveBeenCalledTimes(1);
  });
  it('should save game and close', () => {
    useFetch.mockReturnValue([
      { result: { ...gameData.audio, message: 'Results are saved' } },
      fetchFunc,
      resetData
    ]);
    render(
      <BrowserRouter>
        <AppProvider>
          <Game config={config.audio} closeHandler={handler} gameId="audio" />
        </AppProvider>
      </BrowserRouter>
    );
    expect(screen.getByText('Results are saved')).toBeInTheDocument();
    const finishButton = screen.getByText(finishButtonText);
    fireEvent.click(finishButton);
    expect(handler).toHaveBeenCalled();
  });
});
