import React, { useState } from 'react';
import { PopUp } from '../../components/pop-up/pop-up';
import { WritingGame } from '../../components/games/writing/writing-game';
import bannerImg from '../../assets/img/jpg/word-games-banner.jpg';
import { Banner } from '../../components/banner/banner';

// TODO add some view to this page. Now it looks ugly(:
export const WordGamesPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => setIsOpen(!isOpen);
  return (
    <>
      <Banner
        imgSrc={bannerImg}
        mainHeading="Word games"
        subHeading="Practice makes perfect"
      />
      <button type="button" onClick={onClick}>
        Start game
      </button>
      <PopUp open={isOpen} onClose={onClick}>
        <WritingGame closeHandler={onClick} />
      </PopUp>
    </>
  );
};
