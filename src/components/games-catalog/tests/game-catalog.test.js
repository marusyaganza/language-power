import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { games, gamesWithouImg } from './game-catalog.mock';

import GamesCatalog from '../index';

const handler = jest.fn();

describe('GameCatalog', () => {
  it('should display catalog', () => {
    render(<GamesCatalog games={games} onClick={handler} />);
    fireEvent.click(screen.getByText('Start game'));
    expect(handler).toHaveBeenCalledWith({
      config: games[0].config,
      gameId: games[0].name
    });
    expect(screen.getByAltText('name logo.')).toHaveAttribute(
      'src',
      `undefined/${games[0].logo}`
    );
  });
  it('should render default logo', () => {
    render(<GamesCatalog games={gamesWithouImg} onClick={handler} />);
    expect(screen.getByAltText('name logo.')).toHaveAttribute(
      'src',
      'test-file-stub'
    );
  });
});
