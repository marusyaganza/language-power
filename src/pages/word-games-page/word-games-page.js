import React, { useState } from 'react';
import { PopUp } from '../../components/pop-up/pop-up';
import bannerImg from '../../assets/img/jpg/games_banner.jpg';
import { Banner } from '../../components/banner/banner';
import { GamesCatalog } from '../../components/games-catalog/games-catalog';
import { games } from './games.mock';
import { config } from './config';

// TODO add some view to this page. Now it looks ugly(:
export const WordGamesPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentGame, setCurrentGame] = useState(null);
  const onClick = () => setIsOpen(!isOpen);
  const gameHandler = gameId => {
    if (games.some(game => game.id === gameId)) {
      setCurrentGame(gameId);
      setIsOpen(!isOpen);
    }
  };

  const renderGame = () => {
    const Game = currentGame ? config[currentGame] : null;
    return Game ? <Game closeHandler={onClick} /> : null;
  };

  return (
    <>
      <Banner
        imgSrc={bannerImg}
        mainHeading="Word games"
        subHeading="Practice makes perfect"
      />
      <PopUp open={isOpen} onClose={onClick}>
        {renderGame()}
      </PopUp>
      <GamesCatalog games={games} onClick={gameHandler} />
    </>
  );
};
