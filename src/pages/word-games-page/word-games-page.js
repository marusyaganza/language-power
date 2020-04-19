import React, { useState, useEffect, useContext } from 'react';
import { PopUp } from '../../components/pop-up/pop-up';
import bannerImg from '../../assets/img/jpg/games_banner.jpg';
import { Banner } from '../../components/banner/banner';
import { GamesCatalog } from '../../components/games-catalog/games-catalog';
import { gamesCatalog } from '../../constants/urls';
import { useFetch } from '../../utils/hooks/fetch/useFetch';
import { Spinner } from '../../elements/spinner/spinner';
import { Game } from '../../components/game/game';
import { AppContext } from '../../app-context/appContext';
import { Warning } from '../../components/warning/warning';

export const WordGamesPage = () => {
  const { userId } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [warning, setWarning] = useState(null);
  const [currentGame, setCurrentGame] = useState(null);
  const [state, sendRequest] = useFetch();
  const { result, error, loading } = state;
  const closeHandler = () => {
    setIsOpen(!isOpen);
  };
  const catalogHandler = data => {
    if (userId) {
      setWarning(null);
      setCurrentGame(data);
    } else {
      setWarning('you should login first');
    }
    closeHandler();
  };

  const gameHandler = () => {
    setCurrentGame(null);
    closeHandler();
  };

  useEffect(() => {
    sendRequest({ url: gamesCatalog });
  }, []);

  const renderGame = () => {
    if (warning) {
      return (
        <PopUp open={isOpen} onClose={closeHandler}>
          <Warning text={warning} buttonHandler={closeHandler} />
        </PopUp>
      );
    }
    if (currentGame) {
      return (
        <>
          <PopUp open={isOpen} onClose={gameHandler}>
            <Game closeHandler={gameHandler} {...currentGame} />
          </PopUp>
        </>
      );
    }
    return null;
  };

  const renderGames = () => {
    if (loading) {
      return <Spinner />;
    }
    if (result) {
      return (
        <>
          {renderGame()}
          <GamesCatalog games={result} onClick={catalogHandler} />
        </>
      );
    }
    return null;
  };

  return (
    <>
      <Banner
        imgSrc={bannerImg}
        mainHeading="Word games"
        subHeading="Practice makes perfect"
      />
      {error && <div>{error}</div>}
      {renderGames()}
    </>
  );
};
