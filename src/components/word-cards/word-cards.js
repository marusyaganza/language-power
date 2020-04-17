import React, { useContext, useState, useEffect } from 'react';
import styles from './word-cards.css';
import { WordCard } from '../word-card/word-card';
import { AppContext } from '../../app-context/appContext';
import { PopUp } from '../pop-up/pop-up';
import { Button } from '../buttons/button/button';
import { useFetch } from '../../utils/hooks/fetch/useFetch';
import { Spinner } from '../../elements/spinner/spinner';
import { Warning } from '../warning/warning';

export const WordCards = () => {
  const { wordCards, updateCards } = useContext(AppContext);
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [state, sendRequest] = useFetch();
  const { result, loading, error } = state;

  const closeHandler = () => {
    setModalIsOpen(curr => !curr);
  };
  const deleteHandler = id => {
    const url = `http://localhost:5000/api/words/${id}`;
    const method = 'DELETE';
    const headers = { 'Content-Type': 'application/json' };
    sendRequest({ url, requestOptions: { method, headers } });
  };

  useEffect(() => {
    if (result) {
      updateCards();
      closeHandler();
    }
  }, [result]);

  const renderModal = () => {
    if (error) {
      return <Warning text={error} buttonHandler={closeHandler} />;
    }
    if (loading) {
      return <Spinner />;
    }
    if (result) {
      return <Warning text={result.message} buttonHandler={closeHandler} />;
    }
    return (
      <>
        <h2>Are you sure?</h2>
        <p>Deleting card is irreversible</p>
        <div className={styles.buttonSet}>
          <Button className={styles.button} onClick={closeHandler}>
            Cancel
          </Button>
          <Button className={styles.button} onClick={deleteHandler} kind="red">
            Delete
          </Button>
        </div>
      </>
    );
  };
  return (
    <>
      {wordCards.error && <div>error</div>}
      {wordCards.loading ? (
        <Spinner />
      ) : (
        <>
          <PopUp open={isModalOpen} onClose={closeHandler}>
            <div className={styles.modal}>{renderModal()}</div>
          </PopUp>
          <section>
            <h2 className={styles.wordsHeading}>
              You have added {wordCards.result.length} cards
            </h2>
            {wordCards.result.map(word => (
              <WordCard
                key={word.uuid}
                word={word}
                deleteWord={deleteHandler}
              />
            ))}
          </section>
        </>
      )}
    </>
  );
};
