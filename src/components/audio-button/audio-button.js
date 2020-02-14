import React from 'react';
import PropTypes from 'prop-types';
import './audio-button.css';
import { Icon } from '../icons/icon';

export const AudioButton = ({ src, buttonText, buttonSize }) => {
  const audioElement = new Audio(src);
  const play = () => {
    audioElement.play();
  };
  return (
    <div>
      <button className="play-button" type="button" onClick={play}>
        <span className="button-text">{buttonText}</span>
        <Icon
          className="play-button__icon"
          id="play"
          height={buttonSize}
          width={buttonSize}
        />
      </button>
    </div>
  );
};

AudioButton.propTypes = {
  src: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  buttonSize: PropTypes.number
};

AudioButton.defaultProps = {
  buttonText: null,
  buttonSize: 18
};
