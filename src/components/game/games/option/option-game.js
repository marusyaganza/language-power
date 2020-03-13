import React from 'react';
import PropTypes from 'prop-types';
import { GameEngine } from '../../game-engine/game-engine';
import { prepareGameData, playAudio } from './helpers';
import { DictionaryEntity } from '../../../dictionary-entity/dictionary-entity';
import { OptionBox } from '../../../option-box/option-box';

export const OptionGame = ({ closeHandler }) => {
  return (
    <GameEngine
      AnsweInput={OptionBox}
      Question={DictionaryEntity}
      onSuccess={currWord => playAudio(currWord.audioUrl)}
      prepareGameData={prepareGameData}
      closeHandler={closeHandler}
    />
  );
};

OptionGame.propTypes = {
  closeHandler: PropTypes.func.isRequired
};
