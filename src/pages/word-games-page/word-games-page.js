import React, { useState } from 'react';
import { PopUp } from '../../components/pop-up/pop-up';
import { WritingGame } from '../../components/games/writing/writing-game';

// TODO add some view to this page. Now it looks ugly(:
export const WordGamesPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => setIsOpen(!isOpen);
  return (
    <>
      <h1>Word Games</h1>
      <div>Games will be added here in the future</div>
      <button type="button" onClick={onClick}>
        Start game
      </button>
      <PopUp open={isOpen} onClose={onClick}>
        <WritingGame closeHandler={onClick} />
      </PopUp>
    </>
  );
};
