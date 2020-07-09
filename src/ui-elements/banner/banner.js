import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './banner.css';

export const Banner = ({
  imgSrc,
  mainHeading,
  imgHeight,
  mobileImg,
  subHeading,
  className
}) => {
  const image = window.matchMedia('(min-width: 760px)').matches
    ? imgSrc
    : mobileImg;
  const style = { backgroundImage: `url(${image})`, height: `${imgHeight}px` };

  return (
    <section
      style={style}
      className={cn(styles.banner, className)}
      data-testid="banner"
    >
      <header className={styles.heading}>
        <h1 className={styles.mainHeading}>{mainHeading}</h1>
        {subHeading && <p className={styles.subheading}>{subHeading}</p>}
      </header>
    </section>
  );
};

Banner.propTypes = {
  imgHeight: PropTypes.number,
  mainHeading: PropTypes.string.isRequired,
  subHeading: PropTypes.string,
  imgSrc: PropTypes.string,
  mobileImg: PropTypes.string,
  className: PropTypes.objectOf(PropTypes.string)
};

Banner.defaultProps = {
  imgHeight: 470,
  subHeading: null,
  imgSrc: null,
  className: null,
  mobileImg: null
};
