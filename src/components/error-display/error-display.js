import React from 'react';
import cn from 'classnames';
import { PropTypes } from 'prop-types';
import { LinkButton } from '../../ui-elements/buttons/link-button/link-button';
import styles from './error-display.css';
import { Button } from '../../ui-elements/buttons/button/button';

export const ErrorDisplay = ({
  heading,
  subHeading,
  link,
  buttonHandler,
  buttonText,
  theme
}) => {
  return (
    <div className={styles.infoContainer}>
      <article className={styles.info}>
        <h1 className={cn(styles.mainHeading, styles[theme])}>{heading}</h1>
        <h2 className={styles.subheading}>{subHeading}</h2>
        <div className={styles.buttonContainer}>
          {link ? (
            <LinkButton size="L" href={link}>
              {buttonText}
            </LinkButton>
          ) : (
            <Button size="L" onClick={buttonHandler}>
              {buttonText}
            </Button>
          )}
        </div>
      </article>
    </div>
  );
};

ErrorDisplay.propTypes = {
  heading: PropTypes.string.isRequired,
  subHeading: PropTypes.string.isRequired,
  link: PropTypes.string,
  buttonText: PropTypes.string,
  theme: PropTypes.string,
  buttonHandler: PropTypes.func
};

ErrorDisplay.defaultProps = {
  link: null,
  buttonText: 'Return to HomePage',
  theme: 'base',
  buttonHandler: () => {}
};
