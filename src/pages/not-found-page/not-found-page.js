import React from 'react';
import { LinkButton } from '../../components/buttons/link-button/link-button';
import styles from './not-found-page.css';

export const NotFoundPage = () => {
  return (
    <div className={styles.infoContainer}>
      <article className={styles.info}>
        <h1 className={styles.mainHeading}>404</h1>
        <h2 className={styles.subheading}>Page is not found</h2>
        <div className={styles.buttonContainer}>
          <LinkButton href="/"> Go to Home page </LinkButton>
        </div>
      </article>
    </div>
  );
};
