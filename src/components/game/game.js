import React from 'react';
import PropTypes from 'prop-types';
import { GameEngine } from './game-engine/game-engine';
import { Input } from '../../ui-elements/input/input';
import { AudioButton } from '../../ui-elements/buttons/audio-button/audio-button';
import styles from './game.css';
import { OptionBox } from '../option-box/option-box';
import { DictionaryEntity } from '../dictionary-entity/dictionary-entity';
import { playAudio } from './helpers';

export const Game = ({ closeHandler, config, gameId }) => {
  const renderQuestion = text => {
    if (config.AUDIO_IS_REQUIRED) {
      return (
        <div className={styles.audio}>
          <AudioButton autoplay src={text} buttonSize={80} />
        </div>
      );
    }
    return <DictionaryEntity text={text} />;
  };
  const renderAnswer = rest => {
    if (config.MULTIPLE_CORRECT_ANSWERS) {
      return <OptionBox type="checkbox" {...rest} />;
    }
    if (config.OPTIONS_NUM) {
      return <OptionBox type="radio" {...rest} />;
    }
    return <Input {...rest} />;
  };
  const onSuccess = config.AUDIO_IS_REQUIRED
    ? null
    : currWord => playAudio(currWord.audioUrl);
  return (
    <GameEngine
      renderAnswer={renderAnswer}
      renderQuestion={renderQuestion}
      closeHandler={closeHandler}
      gameId={gameId}
      onSuccess={onSuccess}
    />
  );
};

Game.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  gameId: PropTypes.string.isRequired
};
