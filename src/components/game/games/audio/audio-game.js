import React from 'react';
import PropTypes from 'prop-types';
import { GameEngine } from '../../game-engine/game-engine';
import { prepareGameData } from './helpers';
import { Input } from '../../../input/input';
import { AudioButton } from '../../../audio-button/audio-button';

export const AudioGame = ({ closeHandler }) => {
  // eslint-disable-next-line react/prop-types
  const Question = ({ text }) => (
    <AudioButton buttonSize={50} autoplay src={text} />
  );
  return (
    <GameEngine
      AnsweInput={Input}
      Question={Question}
      prepareGameData={prepareGameData}
      closeHandler={closeHandler}
    />
  );
};

AudioGame.propTypes = {
  closeHandler: PropTypes.func.isRequired
};
