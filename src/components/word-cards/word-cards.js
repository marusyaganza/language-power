import React, { useContext, useState, useEffect, Suspense } from 'react';
import styles from './word-cards.css';
import { AppContext } from '../../app-context/appContext';
import { PopUp } from '../../ui-elements/pop-up/pop-up';
import { Button } from '../../ui-elements/buttons/button/button';
import { useFetch } from '../../utils/hooks/fetch/useFetch';
import { Spinner } from '../../ui-elements/spinner/spinner';
import { Warning } from '../warning/warning';
import { wordsUrl } from '../../constants/urls';

const WordCard = React.lazy(() =>
  import(/* webpackPreload: true */ '../word-card')
);

export const WordCards = () => {
  const { wordCards, updateCards, token } = useContext(AppContext);
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [state, sendRequest] = useFetch();
  const { result, loading, error } = state;

  const closeHandler = () => {
    setModalIsOpen(curr => !curr);
  };
  const deleteHandler = id => {
    const url = `${wordsUrl}${id}`;
    const method = 'DELETE';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`
    };
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
              <Suspense fallback={<Spinner />}>
                <WordCard
                  key={word.uuid}
                  word={word}
                  deleteWord={deleteHandler}
                />
              </Suspense>
            ))}
          </section>
        </>
      )}
    </>
  );
};
