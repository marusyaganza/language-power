import React from 'react';
import img from '../../assets/img/jpg/main-banner-img.jpg';
import mobileImg from '../../assets/img/jpg/main-banner-img.mobile.jpg';
import { Banner } from '../../ui-elements/banner/banner';
import styles from './homePage.css';
import commonStyles from '../../assets/styles/common-styles.css';
import { Button } from '../../ui-elements/buttons/button/button';
import { Icon } from '../../ui-elements/icons/icon';

export const HomePage = () => {
  return (
    <>
      <Banner
        imgSrc={img}
        mainHeading="Welcome to Language Power"
        subHeading="Start learning English today!"
        mobileImg={mobileImg}
      />
      <ul className={styles.catalog}>
        <li className={styles.catalogItem} key="vocabulary">
          <article className={styles.itemContent}>
            <Icon id="search" width={66} height={66} />
            <h3>Search for translation</h3>
            <p className={styles.description}>
              Get verified full definition of word illustrated by examples.
            </p>
          </article>
        </li>
        <li className={styles.catalogItem} key="">
          <article className={styles.itemContent}>
            <Icon id="vocabulary" width={66} height={66} />
            <h3>Add to vocabulary</h3>
            <p className={styles.description}>
              You will never lose or forget it.
            </p>
          </article>
        </li>
        <li className={styles.catalogItem} key="">
          <article className={styles.itemContent}>
            <Icon id="game" width={66} height={66} />
            <h3>Practice every day</h3>
            <p className={styles.description}>
              Practice makes perfect! It&apos;s easy to memorise new words with
              our games.
            </p>
          </article>
        </li>
      </ul>
      <div className={commonStyles.buttonSet}>
        <Button
          href="/search_words"
          kind="purple"
          size="XL"
          className={styles.button}
        >
          Add words
        </Button>
        <Button
          href="/word_games"
          kind="yellow"
          size="XL"
          className={styles.button}
        >
          Train words
        </Button>
      </div>
    </>
  );
};
