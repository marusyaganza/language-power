import React, { useContext, useState, useEffect, Suspense } from 'react';
import { AppContext } from '../../app-context/appContext';
import { PopUp } from '../../ui-elements/pop-up/pop-up';
import { Button } from '../../ui-elements/buttons/button/button';
import { useFetch } from '../../utils/hooks/fetch/useFetch';
import { Spinner } from '../../ui-elements/spinner/spinner';
import { Warning } from '../warning/warning';
import { wordsUrl } from '../../constants/urls';
import commonStyles from '../../assets/styles/common-styles.css';
import styles from './word-cards.css';

const WordCard = React.lazy(() => import('../word-card'));

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
        <div>
          <Button onClick={closeHandler}>Cancel</Button>
          <Button onClick={deleteHandler} kind="red">
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
            <div>{renderModal()}</div>
          </PopUp>
          <section>
            <h2 className={commonStyles.subheading}>
              You have added {wordCards.result.length} cards
            </h2>
            <ul className={styles.cardsList}>
              {wordCards.result.map(word => (
                <li key={word.uuid}>
                  <Suspense fallback={<Spinner />}>
                    <WordCard word={word} deleteWord={deleteHandler} />
                  </Suspense>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </>
  );
};
