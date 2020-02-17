import React, { memo } from 'react';
import './word-card.css';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { AudioButton } from '../audio-button/audio-button';
import { Icon } from '../icons/icon';
import { DictionaryEntity } from '../dictionary-entity/dictionary-entity';
import { ShowMore } from '../show-more/show-more';
import '../word-cards/word-cards.css';

// TODO handle empty list elem
export const WordCard = memo(({ word }) => {
  const { name, defs, particle, pronunciation, fullDef, stems } = word;
  const { examples } = fullDef;

  const renderExamples = ex => {
    if (!ex || !ex.length) return null;
    const listItems = ex.map(item => (
      <li key={uuid()} className="example-item">
        <DictionaryEntity className="examples-list__info" text={item} />
      </li>
    ));
    return (
      <section className="examples">
        <details>
          <summary className="examples-title">Examples</summary>
          <ol className="examples-list">{listItems}</ol>
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
      <section className="audio">
        <div>[{transcription}]</div>
      </section>
    );
  };
  const renderDefs = defsArr => {
    if (!defsArr) return null;
    return defsArr.map(def => {
      return defsArr.length ? (
        // TODO create list component for this
        <li className="def-list__item" key={uuid()}>
          <i className="text-icon">
            <Icon width={14} height={16} id="book" />
          </i>
          <p className="def-item">
            <DictionaryEntity text={def} />
          </p>
        </li>
      ) : null;
    });
  };

  return (
    <article className="word">
      <header className="word-header">
        <span className="name">{name}</span>
        <span className="particle">{particle}</span>{' '}
        {renderAudio(pronunciation)}
      </header>
      <ul className="defs-list">{renderDefs(defs)}</ul>
      <ShowMore items={stems} title="word forms: " initialNumber={5} />
      {renderExamples(examples)}
    </article>
  );
});

WordCard.propTypes = {
  word: PropTypes.object.isRequired
};
