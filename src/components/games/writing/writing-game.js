import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../../app-context/appContext';
import { prepareGameData } from './helpers';

export const WritingGame = ({ closeHandler }) => {
  const { wordCards, learnWords } = useContext(AppContext);
  const [answer, setAnswer] = useState('');
  const [isError, setIsError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [qa, setQa] = useState(null);
  const [learntCards, setLearntCards] = useState(null);

  const resetGame = () => {
    const [qaArr, learntCardsArr] = prepareGameData(wordCards);
    setIsComplete(false);
    setIsError(false);
    setQa(qaArr);
    setAnswer('');
    setCurrentIndex(0);
    setLearntCards(learntCardsArr);
  };

  useEffect(() => {
    resetGame();
  }, []);

  const completeGame = () => {
    learnWords({ gameId: 'write', learntCards });
    resetGame();
  };

  const onFinish = () => {
    completeGame();
    closeHandler();
  };

  const submitHandler = e => {
    e.preventDefault();
    if (answer === qa[currentIndex].a) {
      qa[currentIndex].audioElement.play();
      setIsError(false);
      if (currentIndex === qa.length - 1) {
        setIsComplete(true);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    } else {
      setIsError(true);
    }
    setAnswer('');
  };

  const changeHandler = event => {
    setAnswer(event.target.value);
  };

  const renderStatusBar = () => {
    return (
      <header>
        <span>
          {currentIndex + 1} of {qa.length}
        </span>
        {!isError && currentIndex > 0 && <span>Nice:) </span>}
      </header>
    );
  };

  const renderGame = () => {
    if (!qa) {
      return <div>Game loading...</div>;
    }
    if (!qa.length) {
      return <div>All words are learnt, congrats!</div>;
    }
    if (isComplete) {
      return (
        <>
          <p>Training complete</p>
          <button type="button" onClick={completeGame}>
            continue training
          </button>
          <button type="button" onClick={onFinish}>
            finish
          </button>
        </>
      );
    }
    return (
      <article>
        <p>{qa[currentIndex].q}</p>
        <form onSubmit={submitHandler}>
          <input value={answer} onChange={changeHandler} type="text" />
          <button type="submit">Submit</button>
        </form>
      </article>
    );
  };

  return (
    <>
      {qa && renderStatusBar()}
      {renderGame()}
      {isError && <div>Wrong! Please try again</div>}
    </>
  );
};

WritingGame.propTypes = {
  closeHandler: PropTypes.bool.isRequired
};
