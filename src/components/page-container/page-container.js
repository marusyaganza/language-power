/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import styles from './page-container.css';
import { AppContext } from '../../app-context/appContext';

export const PageContainer = ({ children }) => {
  const { isModalOpen } = useContext(AppContext);
  if (isModalOpen) {
    return (
      <div className={styles.inert} tabIndex="-1" aria-hidden>
        {children}
      </div>
    );
  }
  return <div>{children}</div>;
};
