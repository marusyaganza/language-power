import React, { useContext, useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../../app-context/appContext';
import { Button } from '../../../ui-elements/buttons/button/button';
import { Icon } from '../../../ui-elements/icons/icon';
import { LinkButton } from '../../../ui-elements/buttons/link-button/link-button';
import { STATUSES, MESSAGES } from './config';
import styles from './game-engine.css';
import { Spinner } from '../../../ui-elements/spinner/spinner';
import { useFetch } from '../../../utils/hooks/fetch/useFetch';
import { gameReducer } from './game-reducer';
import { initialState } from './initialState';
import { ACTIONS } from './actions';
import { gameUrl } from '../../../constants/urls';

export const GameEngine = ({
  closeHandler,
  renderQuestion,
  renderAnswer,
  gameId,
  onSuccess
}) => {
  const { userId, token } = useContext(AppContext);
  const [answer, setAnswer] = useState('');
  const [reqState, sendRequest] = useFetch();
  const { error, loading, result } = reqState;
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { learntCards, qa, status, errorCount, currentIndex } = state;
  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    const url = `${gameUrl}${gameId}`;
    sendRequest({ url, requestOptions: { headers } });
  }, [userId]);

  useEffect(() => {
    if (result && result.qa) {
      dispatch({
        type: ACTIONS.LOADED,

        payload: {
          qa: result.qa,
          learntCards: result.learntCards
        }
      });
    }
    if (result && result.message) {
      const { message } = result;
      dispatch({
        type: ACTIONS.COMPLETED,
        payload: {
          message
        }
      });
    }
  }, [result]);

  const completeGame = () => {
    const url = `${gameUrl}/score`;
    const body = JSON.stringify({ userId, gameId, gameResults: learntCards });
    const method = 'PATCH';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };
    sendRequest({ url, requestOptions: { body, method, headers } });
  };

  const submitHandler = e => {
    e.preventDefault();
    const currentWord = qa[currentIndex];
    if (answer === currentWord.a) {
      if (onSuccess) {
        onSuccess(currentWord);
      }
      dispatch({ type: ACTIONS.SUCCESS });
      setAnswer('');
    } else {
      dispatch({ type: ACTIONS.ERROR });
    }
  };

  const changeHandler = val => {
    setAnswer(val);
  };

  const renderStatusBar = () => {
    if (loading || status === STATUSES.LOADING) {
      return null;
    }
    return (
      <header className={styles.statusbar}>
        <div>
          {currentIndex + 1} of {qa.length}
        </div>
        {status === STATUSES.SUCCESS && (
          <div className={styles.correctAnswer}>{state.text}</div>
        )}
        {status && <div className={styles[status]}>{MESSAGES[status]}</div>}
      </header>
    );
  };

  const renderGame = () => {
    if (loading || status === STATUSES.LOADING) {
      return <Spinner />;
    }
    if (status === STATUSES.LEARNT) {
      return (
        <section className={styles.gameResults}>
          <div className={styles.mainResult}>
            All words are learnt, congrats!
            <div className={styles.buttonSet}>
              <LinkButton href="/search_words" size="S">
                Add new words
              </LinkButton>
            </div>
          </div>
        </section>
      );
    }
    if (status === STATUSES.COMPLETE) {
      return (
        <>
          <section className={styles.gameResults}>
            <div className={styles.mainResult}>
              <span className={styles.mainResultText}>Training complete</span>
              <Icon id="finish" width={16} height={16} />
            </div>
            <div className={styles.resultDetails}>
              <p>You made {errorCount} mistakes</p>
              <p>You practiced {qa.length} words</p>
            </div>
          </section>
          <div className={styles.buttonSet}>
            <Button type="button" onClick={completeGame}>
              Finish game
            </Button>
          </div>
        </>
      );
    }
    if (status === STATUSES.SAVED) {
      return (
        <section className={styles.gameResults}>
          <div className={styles.resultDetails}>
            {state.message || 'See you later'}
          </div>
          <div className={styles.buttonSet}>
            <Button type="button" onClick={closeHandler}>
              Finish game
            </Button>
          </div>
        </section>
      );
    }
    return (
      <>
        <p className={styles.question}>{renderQuestion(qa[currentIndex].q)}</p>
        <form className={styles.answer} onSubmit={submitHandler}>
          {renderAnswer({
            isError: status === STATUSES.ERROR,
            name: 'answer',
            className: styles.answerInput,
            onChange: changeHandler,
            value: answer,
            options: qa[currentIndex].options
          })}
          <Button size="L" type="submit">
            Check
          </Button>
        </form>
      </>
    );
  };
  return (
    <>
      {renderStatusBar()}
      {error && <div className={styles.error}>{error}</div>}
      <article className={styles.game}>{renderGame()}</article>
    </>
  );
};

GameEngine.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  renderQuestion: PropTypes.func.isRequired,
  renderAnswer: PropTypes.func.isRequired,
  gameId: PropTypes.string.isRequired,
  onSuccess: PropTypes.func
};

GameEngine.defaultProps = {
  onSuccess: null
};
