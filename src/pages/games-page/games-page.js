import React, { useState, useEffect, useContext, Suspense } from 'react';
import { PopUp } from '../../ui-elements/pop-up/pop-up';
import bannerImg from '../../assets/img/jpg/games_banner.jpg';
import bannerImgMobile from '../../assets/img/jpg/games_banner.mobile.jpg';
import { Banner } from '../../ui-elements/banner/banner';
// import { GamesCatalog } from '../../components/games-catalog/games-catalog';
import { gamesCatalogUrl } from '../../constants/urls';
import { useFetch } from '../../utils/hooks/fetch/useFetch';
import { Spinner } from '../../ui-elements/spinner/spinner';
// import { Game } from '../../components/game/game';
import { AppContext } from '../../app-context/appContext';
import { Warning } from '../../components/warning/warning';

const GamesCatalog = React.lazy(() => import('../../components/games-catalog'));
const Game = React.lazy(() => import('../../components/game'));

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
    sendRequest({ url: gamesCatalogUrl });
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
            <Suspense fallback={<Spinner />}>
              <Game closeHandler={gameHandler} {...currentGame} />
            </Suspense>
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
          <Suspense fallback={<Spinner />}>
            <GamesCatalog games={result} onClick={catalogHandler} />
          </Suspense>
        </>
      );
    }
    return null;
  };

  return (
    <>
      <Banner
        imgSrc={bannerImg}
        mobileImg={bannerImgMobile}
        mainHeading="Word games"
        subHeading="Practice makes perfect"
      />
      {error && <div>{error}</div>}
      {renderGames()}
    </>
  );
};