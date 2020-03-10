/* eslint-disable quotes */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './banner.css';

export const Banner = ({ imgSrc, mainHeading, imgHeight, subHeading }) => {
  const style = { backgroundImage: `url(${imgSrc})`, height: `${imgHeight}px` };
  return (
    <section style={style} className={styles.banner}>
      <header className={styles.heading}>
        <h1 className={styles.mainHeading}>{mainHeading}</h1>
        {subHeading && <p className={styles.subheading}>{subHeading}</p>}
      </header>
    </section>
  );
};

Banner.propTypes = {
  imgHeight: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  mainHeading: PropTypes.string.isRequired,
  subHeading: PropTypes.string,
  imgSrc: PropTypes.string
};

Banner.defaultProps = {
  imgHeight: 470,
  subHeading: null,
  imgSrc: null
};
