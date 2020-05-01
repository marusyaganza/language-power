import React from 'react';
import cn from 'classnames';
import { PropTypes } from 'prop-types';
import { LinkButton } from '../../ui-elements/buttons/link-button/link-button';
import styles from './error-display.css';
import { Button } from '../../ui-elements/buttons/button/button';
import { Icon } from '../../ui-elements/icons/icon';

export const ErrorDisplay = ({
  heading,
  headingIcon,
  subHeading,
  link,
  buttonHandler,
  buttonText,
  theme
}) => {
  return (
    <div className={styles.infoContainer}>
      <article className={styles.info}>
        <h1 className={cn(styles.mainHeading, styles[theme])}>
          {heading}
          {headingIcon && <Icon id={headingIcon} width={100} height={50} />}
        </h1>
        <h2 className={styles.subheading}>{subHeading}</h2>
        <div className={styles.buttonContainer}>
          {link ? (
            <LinkButton size="L" href={link}>
              {buttonText}
            </LinkButton>
          ) : (
            <Button size="L" onClick={buttonHandler}>
              {buttonText} <Icon id="reload" width="16" height="16" />
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
  buttonHandler: PropTypes.func,
  headingIcon: PropTypes.string
};

ErrorDisplay.defaultProps = {
  link: null,
  buttonText: 'Return to HomePage',
  theme: 'base',
  buttonHandler: () => {},
  headingIcon: null
};
