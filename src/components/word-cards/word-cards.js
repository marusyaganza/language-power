import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../app-context/appContext';
import { PopUp } from '../../ui-elements/pop-up/pop-up';
import { Button } from '../../ui-elements/buttons/button/button';
import { useFetch } from '../../utils/hooks/fetch/useFetch';
import { Spinner } from '../../ui-elements/spinner/spinner';
import { Warning } from '../warning/warning';
import { wordsUrl } from '../../constants/urls';
import commonStyles from '../../assets/styles/common-styles.css';
import styles from './word-cards.css';
import { ErrorContainer } from '../../ui-elements/error-container/error-container';

import { WordCard } from '../word-card/word-card';

export const WordCards = () => {
  const { wordCards, updateCards, token } = useContext(AppContext);
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [warning, setWarning] = useState('');
  const [deleteCardId, setDeleteCardId] = useState('');
  const [state, sendRequest] = useFetch();
  const { result, loading, error } = state;
  const closeHandler = () => {
    setModalIsOpen(false);
  };
  const deleteHandler = () => {
    if (!deleteCardId) return;
    const url = `${wordsUrl}${deleteCardId}`;
    const method = 'DELETE';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };
    sendRequest({ url, requestOptions: { method, headers } });
    setDeleteCardId('');
  };

  const deleteButtonHandler = id => {
    setWarning('');
    setModalIsOpen(true);
    setDeleteCardId(id);
  };

  useEffect(() => {
    if (result) {
      setWarning(result.message);
      updateCards();
    }
  }, [result]);

  useEffect(() => {
    setWarning(error);
  }, [error]);

  const renderModal = () => {
    if (loading) {
      return <Spinner />;
    }
    if (warning) {
      return <Warning text={warning} buttonHandler={closeHandler} />;
    }
    if (wordCards.result && wordCards.result.length) {
      return (
        <div className={styles.modal}>
          <h2>Are you sure?</h2>
          <p>Deleting card is irreversible</p>
          <div className={styles.buttonSet}>
            <Button className={styles.button} onClick={closeHandler}>
              Cancel
            </Button>
            <Button
              className={styles.button}
              onClick={deleteHandler}
              kind="red"
            >
              Delete
            </Button>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderCards = () => {
    if (wordCards.result && wordCards.result.length) {
      return (
        <ul className={styles.cardsList} data-testid="cards-list">
          {wordCards.result.map(word => (
            <li key={word.uuid}>
              <WordCard word={word} deleteWord={deleteButtonHandler} />
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  if (wordCards.loading) {
    return <Spinner />;
  }

  return (
    <>
      {wordCards.error && (
        <ErrorContainer>error: {wordCards.error.message}</ErrorContainer>
      )}
      <PopUp open={isModalOpen} onClose={closeHandler}>
        {renderModal()}
      </PopUp>
      <section>
        <h2 className={commonStyles.subheading}>
          You have added{' '}
          {wordCards.result && wordCards.result.length
            ? wordCards.result.length
            : 0}{' '}
          cards
        </h2>
        {renderCards()}
      </section>
    </>
  );
};
