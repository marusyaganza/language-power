import React from 'react';
import PropTypes from 'prop-types';
import { GameEngine } from './game-engine/game-engine';
import { Input } from '../input/input';
import { AudioButton } from '../audio-button/audio-button';
import styles from './game.css';
import { OptionBox } from '../option-box/option-box';
import { Checkbox } from '../checkbox/checkbox';
import { DictionaryEntity } from '../dictionary-entity/dictionary-entity';
import { playAudio } from './helpers';

export const Game = ({ closeHandler, config, gameId }) => {
  // eslint-disable-next-line react/prop-types
  const Audio = ({ text }) => (
    <div className={styles.audio}>
      <AudioButton autoplay src={text} />
    </div>
  );
  const getQuestionComponent = () => {
    if (config.AUDIO_IS_REQUIRED) {
      return Audio;
    }
    return DictionaryEntity;
  };
  const getAnswerComponent = () => {
    if (config.MULTIPLE_CORRECT_ANSWERS) {
      return Checkbox;
    }
    if (config.OPTIONS_NUM) {
      return OptionBox;
    }
    return Input;
  };
  const onSuccess = config.AUDIO_IS_REQUIRED
    ? null
    : currWord => playAudio(currWord.audioUrl);
  return (
    <GameEngine
      AnswerInput={getAnswerComponent()}
      Question={getQuestionComponent()}
      closeHandler={closeHandler}
      gameId={gameId}
      onSuccess={onSuccess}
    />
  );
};

Game.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  config: PropTypes.objectOf({
    AUDIO_IS_REQUIRED: PropTypes.bool,
    MULTIPLE_CORRECT_ANSWERS: PropTypes.bool,
    OPTIONS_NUM: PropTypes.number
  }).isRequired,
  gameId: PropTypes.string.isRequired
};
