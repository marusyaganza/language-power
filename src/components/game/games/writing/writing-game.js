import React from 'react';
import PropTypes from 'prop-types';
import { GameEngine } from '../../game-engine/game-engine';
import { playAudio } from '../../helpers';
import { prepareGameData } from './helpers';
import { DictionaryEntity } from '../../../dictionary-entity/dictionary-entity';
import { Input } from '../../../input/input';

export const WritingGame = ({ closeHandler }) => {
  return (
    <GameEngine
      AnsweInput={Input}
      Question={DictionaryEntity}
      onSuccess={currWord => playAudio(currWord.audioUrl)}
      prepareGameData={prepareGameData}
      closeHandler={closeHandler}
    />
  );
};

WritingGame.propTypes = {
  closeHandler: PropTypes.func.isRequired
};
