import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import styles from './word-card.css';
import { AudioButton } from '../../ui-elements/buttons/audio-button/audio-button';
import { Icon } from '../../ui-elements/icons/icon';
import { DictionaryEntity } from '../dictionary-entity/dictionary-entity';
import { ShowMore } from '../show-more/show-more';
import { IconButton } from '../../ui-elements/buttons/icon-button/icon-button';

export const WordCard = memo(
  ({ word, addWord, deleteWord, isAdded, isEditable }) => {
    const { name, defs, particle, pronunciation, examples, stems } = word;

    const deleteHandler = () => {
      deleteWord(word.id);
    };

    const addHandler = () => {
      addWord(word);
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
      if (!data || !data.transcription) {
        return null;
      }
      const { transcription, audioUrl } = data;

      return (
        <section className={styles.audio} data-testid="audio">
          {audioUrl ? (
            <AudioButton
              buttonText={`[${transcription}]`}
              src={audioUrl}
              size={18}
            />
          ) : (
            <div className={styles.transcription}>[{transcription}]</div>
          )}
        </section>
      );
    };
    const renderDefs = defsArr => {
      if (!defsArr || !defsArr.length) return null;
      const list = defsArr.map(def => {
        return (
          <li className={styles.defListItem} key={uuid()}>
            <i className={styles.textIcon}>
              <Icon width={14} height={16} id="book" />
            </i>
            <p className={styles.defItem}>
              <DictionaryEntity text={def} />
            </p>
          </li>
        );
      });
      return (
        <ul className={styles.defsList} data-testid="defs">
          {list}
        </ul>
      );
    };

    return (
      <>
        <article className={styles.word}>
          <div className={styles.top}>
            <header className={styles.wordHeader}>
              <span className={styles.name}>{name}</span>
              <span className={styles.particle}>{particle}</span>
              {renderAudio(pronunciation)}
            </header>
            <div className={styles.controlsContainer}>
              {isEditable && (
                <Link to={`/word_cards/${word.uuid}`}>
                  <Icon
                    width={20}
                    height={18}
                    id="edit"
                    className={styles.editIcon}
                    tooltip={`edit ${word.name}`}
                  />
                </Link>
              )}
              {deleteWord && (
                <IconButton
                  kind="delete"
                  iconHint={`delete ${word.name} card`}
                  size="M"
                  onClick={deleteHandler}
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
          {renderDefs(defs)}
          <ShowMore items={stems} title="word forms: " initialNumber={5} />
          {renderExamples(examples)}
        </article>
      </>
    );
  }
);

WordCard.propTypes = {
  word: PropTypes.object.isRequired,
  addWord: PropTypes.func,
  deleteWord: PropTypes.func,
  isAdded: PropTypes.bool,
  isEditable: PropTypes.bool
};

WordCard.defaultProps = {
  addWord: null,
  deleteWord: null,
  isAdded: false,
  isEditable: false
};
