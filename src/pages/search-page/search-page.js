import React, { useState, useEffect, useContext } from 'react';
import { WordSearch } from '../../components/word-search/word-search';
import { PopUp } from '../../ui-elements/pop-up/pop-up';
import { useFetch } from '../../utils/hooks/fetch/useFetch';
import { AppContext } from '../../app-context/appContext';
import { Spinner } from '../../ui-elements/spinner/spinner';
import { Warning } from '../../components/warning/warning';
import { wordsUrl } from '../../constants/urls';
import { ErrorContainer } from '../../ui-elements/error-container/error-container';

export const SearchPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [warning, setWarning] = useState('');
  const { updateCards, token } = useContext(AppContext);
  const [state, sendRequest] = useFetch();
  const { result, loading, error } = state;

  const addCard = card => {
    if (!token) {
      setWarning('You should login before adding card');
      setIsModalOpen(true);
    } else {
      const url = `${wordsUrl}addCard`;
      const body = JSON.stringify(card);
      const method = 'POST';
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`
      };
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
    <main>
      <ErrorContainer>{error}</ErrorContainer>
      <PopUp open={isModalOpen} onClose={closeHandler}>
        {loading ? (
          <Spinner />
        ) : (
          isModalOpen && <Warning text={warning} buttonHandler={closeHandler} />
        )}
      </PopUp>

      <WordSearch addWord={addCard} />
    </main>
  );
};
