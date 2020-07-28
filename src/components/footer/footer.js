import React from 'react';
import styles from './footer.css';
import { Icon } from '../../ui-elements/icons/icon';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <address className={styles.contactInfo}>
        <span>
          created by{' '}
          <a className={styles.link} href="mailto:marusyaganza@yandex.ru">
            marusyaganza
          </a>
        </span>
        <a
          href="https://github.com/marusyaganza/language-power"
          className={styles.social}
        >
          <Icon
            id="github"
            height={30}
            width={30}
            tooltip="Language power on github."
          />
        </a>
      </address>
    </footer>
  );
};
