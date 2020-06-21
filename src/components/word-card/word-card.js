import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import styles from './word-card.css';
import { AudioButton } from '../../ui-elements/buttons/audio-button/audio-button';
import { Icon } from '../../ui-elements/icons/icon';
import { DictionaryEntity } from '../dictionary-entity/dictionary-entity';
import { ShowMore } from '../show-more/show-more';
import { IconButton } from '../../ui-elements/buttons/icon-button/icon-button';
import { PopUp } from '../../ui-elements/pop-up/pop-up';
import { Button } from '../../ui-elements/buttons/button/button';

export const WordCard = memo(({ word, addWord, deleteWord, isAdded }) => {
  const { name, defs, particle, pronunciation, examples, stems } = word;
  const [isModalOpen, setModalIsOpen] = useState(false);

  const closeHandler = () => {
    setModalIsOpen(curr => !curr);
  };
  const deleteHandler = () => {
    deleteWord(word.id);
    closeHandler();
  };

  const addHandler = () => {
    addWord(word);
  };

  const renderModal = () => {
    return (
      <PopUp open={isModalOpen} onClose={closeHandler}>
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
      </PopUp>
    );
  };

  const renderExamples = ex => {
    if (!ex || !ex.length) return null;
    const listItems = ex.map(item => {
      const key = uuid();
      return (
        <li key={key} className={styles.examplesItem}>
          <DictionaryEntity className={styles.examplesListInfo} text={item} />
        </li>
      );
    });
    return (
      <section className={styles.examples}>
        <details>
          <summary className={styles.examplesTitle}>Examples</summary>
          <ol className={styles.examplesList}>{listItems}</ol>
        </details>
      </section>
    );
  };
  const renderAudio = data => {
    if (!data) {
      return null;
    }
    const { transcription, audioUrl } = data;
    return audioUrl ? (
      <AudioButton buttonText={`[${transcription}]`} src={audioUrl} size={18} />
    ) : (
      <section className={styles.audio}>
        <div>[{transcription}]</div>
      </section>
    );
  };
  const renderDefs = defsArr => {
    if (!defsArr) return null;
    return defsArr.map(def => {
      return defsArr.length ? (
        <li className={styles.defListItem} key={uuid()}>
          <i className={styles.textIcon}>
            <Icon width={14} height={16} id="book" />
          </i>
          <p className={styles.defItem}>
            <DictionaryEntity text={def} />
          </p>
        </li>
      ) : null;
    });
  };

  return (
    <>
      {renderModal()}
      <article className={styles.word}>
        <div className={styles.top}>
          <header className={styles.wordHeader}>
            <span className={styles.name}>{name}</span>
            <span className={styles.particle}>{particle}</span>
            {renderAudio(pronunciation)}
          </header>
          <div>
            {deleteWord && (
              <IconButton
                kind="delete"
                iconHint={`delete ${word.name} card`}
                size="M"
                onClick={closeHandler}
              />
            )}
            {addWord && (
              <IconButton
                kind="add"
                iconHint={`add ${word.name} to cards`}
                size="M"
                onClick={addHandler}
                disabled={isAdded}
                disposable
              />
            )}
          </div>
        </div>
        <ul className={styles.defsList}>{renderDefs(defs)}</ul>
        <ShowMore items={stems} title="word forms: " initialNumber={5} />
        {renderExamples(examples)}
      </article>
    </>
  );
});

WordCard.propTypes = {
  word: PropTypes.object.isRequired,
  addWord: PropTypes.func,
  deleteWord: PropTypes.func,
  isAdded: PropTypes.bool
};

WordCard.defaultProps = {
  addWord: null,
  deleteWord: null,
  isAdded: false
};
