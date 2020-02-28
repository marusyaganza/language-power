import React, { memo } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import styles from './word-card.css';
import { AudioButton } from '../audio-button/audio-button';
import { Icon } from '../icons/icon';
import { DictionaryEntity } from '../dictionary-entity/dictionary-entity';
import { ShowMore } from '../show-more/show-more';
import '../word-cards/word-cards.css';
import { IconButton } from '../buttons/icon-button/icon-button';

// TODO handle empty list elem
export const WordCard = memo(({ word, addWord, deleteWord, isAdded }) => {
  const { name, defs, particle, pronunciation, fullDef, stems } = word;
  const { examples } = fullDef;

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
    if (!data.length) return null;
    const { transcription, audioUrl } = data[0];
    return audioUrl ? (
      <AudioButton buttonText={`[${transcription}]`} src={audioUrl} />
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
        // TODO create list component for this
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
              iconHint="delete card"
              size="M"
              onClick={() => deleteWord(word.uuid)}
            />
          )}
          {addWord && (
            <IconButton
              kind="add"
              onClick={() => addWord(word)}
              disabled={isAdded}
            />
          )}
        </div>
      </div>
      <ul className={styles.defList}>{renderDefs(defs)}</ul>
      <ShowMore items={stems} title="word forms: " initialNumber={5} />
      {renderExamples(examples)}
    </article>
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
