import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../../app-context/appContext';
import { Button } from '../../buttons/button/button';
import { Icon } from '../../icons/icon';
import { LinkButton } from '../../buttons/link-button/link-button';
import { STATUSES, MESSAGES } from './config';
import styles from './game-engine.css';
import { Spinner } from '../../../elements/spinner/spinner';

export const GameEngine = ({
  closeHandler,
  AnsweInput,
  Question,
  prepareGameData,
  onSuccess
}) => {
  const { wordCards, learnWords } = useContext(AppContext);
  const [answer, setAnswer] = useState('');
  const [errorCount, setErrorCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [qa, setQa] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [status, setStatus] = useState(STATUSES.LOADING);

  const resetGame = () => {
    const [qaArr, learntCards, gameId] = prepareGameData(wordCards);
    const currStatus = qaArr.length ? STATUSES.STARTED : STATUSES.LEARNT;
    setQa(qaArr);
    setAnswer('');
    setCurrentIndex(0);
    setGameData({ learntCards, gameId });
    setStatus(currStatus);
    setErrorCount(0);
  };

  useEffect(() => {
    resetGame();
  }, []);

  const completeGame = () => {
    learnWords(gameData);
    resetGame();
  };

  const onFinish = () => {
    completeGame();
    closeHandler();
  };

  const submitHandler = e => {
    e.preventDefault();
    const currentWord = qa[currentIndex];
    if (answer === currentWord.a) {
      onSuccess(currentWord);
      setStatus(STATUSES.SUCCESS);
      if (currentIndex === qa.length - 1) {
        setStatus(STATUSES.COMPLETE);
      }
      setCurrentIndex(currIndex => currIndex + 1);
      setAnswer('');
    } else {
      setStatus(STATUSES.ERROR);
      setErrorCount(errCount => errCount + 1);
    }
  };

  const changeHandler = e => {
    setAnswer(e.target.value);
  };

  const renderStatusBar = () => {
    return (
      <header className={styles.statusbar}>
        <div>
          {currentIndex} of {qa.length}
        </div>
        {status === STATUSES.SUCCESS && (
          <div className={styles.correctAnswer}>{qa[currentIndex - 1].a}</div>
        )}
        {status && <div className={styles[status]}>{MESSAGES[status]}</div>}
      </header>
    );
  };

  const renderGame = () => {
    if (status === STATUSES.LOADING) {
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
            <Button className={styles.button} onClick={completeGame} size="S">
              continue training
            </Button>
            <Button type="button" onClick={onFinish}>
              finish
            </Button>
          </div>
        </>
      );
    }
    return (
      <>
        <p className={styles.question}>
          <Question text={qa[currentIndex].q} />
        </p>
        <form className={styles.answer} onSubmit={submitHandler}>
          <AnsweInput
            isError={status === STATUSES.ERROR}
            name="answer"
            className={styles.answerInput}
            onChange={changeHandler}
            value={answer}
            options={qa[currentIndex].options}
          />
          <Button size="L" type="submit">
            Check
          </Button>
        </form>
      </>
    );
  };
  return (
    <>
      {status !== STATUSES.LOADING && renderStatusBar()}
      <article className={styles.game}>{renderGame()}</article>
    </>
  );
};

GameEngine.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  AnsweInput: PropTypes.elementType.isRequired,
  Question: PropTypes.elementType.isRequired,
  prepareGameData: PropTypes.func.isRequired
};

GameEngine.defaultProps = {
  onSuccess: () => {}
};
