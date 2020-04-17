import React, { useState, useEffect, useContext } from 'react';
import { WordSearch } from '../../components/word-search/word-search';
import { PopUp } from '../../components/pop-up/pop-up';
import { useFetch } from '../../utils/hooks/fetch/useFetch';
import { AppContext } from '../../app-context/appContext';
import { Spinner } from '../../elements/spinner/spinner';
import { Warning } from '../../components/warning/warning';

export const SearchPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [warning, setWarning] = useState('');
  const { updateCards, userId } = useContext(AppContext);
  const [state, sendRequest] = useFetch();
  const { result, loading, error } = state;

  const addCard = card => {
    if (!userId) {
      setWarning('You should login before adding card');
      setIsModalOpen(true);
    } else {
      const url = `http://localhost:5000/api/words/${userId}`;
      const body = JSON.stringify(card);
      const method = 'POST';
      const headers = { 'Content-Type': 'application/json' };
      sendRequest({ url, requestOptions: { body, method, headers } });
    }
  };

  useEffect(() => {
    if (result) {
      setWarning('card added');
      setIsModalOpen(true);
      updateCards();
    }
  }, [result]);

  const closeHandler = () => {
    setIsModalOpen(curr => !curr);
  };

  return (
    <>
      <div>{error}</div>

      <PopUp open={isModalOpen} onClose={closeHandler}>
        {loading ? (
          <Spinner />
        ) : (
          <Warning text={warning} buttonHandler={closeHandler} />
        )}
      </PopUp>

      <WordSearch addWord={addCard} />
    </>
  );
};
