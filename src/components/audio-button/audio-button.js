import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './audio-button.css';
import { Icon } from '../icons/icon';

export const AudioButton = ({ src, buttonText, buttonSize, autoplay }) => {
  const audioElement = new Audio(src);
  const play = () => {
    audioElement.play();
  };
  useEffect(() => {
    if (autoplay) {
      play();
    }
  }, [src]);
  return (
    <div>
      <button className={styles.playButton} type="button" onClick={play}>
        <span className={styles.buttonText}>{buttonText}</span>
        <Icon
          className={styles.icon}
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
  buttonSize: PropTypes.number,
  autoplay: PropTypes.bool
};

AudioButton.defaultProps = {
  buttonText: null,
  buttonSize: 18,
  autoplay: false
};
