import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../app-context/appContext';
import { WordCard } from '../word-card/word-card';
import { IconButton } from '../../ui-elements/buttons/icon-button/icon-button';
import { Button } from '../../ui-elements/buttons/button/button';
import { useFetch } from '../../utils/hooks/fetch/useFetch';
import { wordsUrl } from '../../constants/urls';
import { Warning } from '../warning/warning';
import { Spinner } from '../../ui-elements/spinner/spinner';
import { ErrorContainer } from '../../ui-elements/error-container/error-container';
import { PopUp } from '../../ui-elements/pop-up/pop-up';

import commonStyles from '../../assets/styles/common-styles.css';
import styles from './edit-word.css';

const MUTABLE_PROPERTIES = ['examples', 'defs'];

export const EditWord = ({ wordId }) => {
  const { wordCards, updateCards, token } = useContext(AppContext);
  const [warning, setWarning] = useState('');
  const card = useMemo(
    () => wordCards?.result?.filter(item => item.uuid === wordId)?.[0]
  );

  const [fields, setFields] = useState();
  const [state, fetchFunc] = useFetch();

  const { result, error, loading } = state;

  const setParams = useCallback(() => {
    const data = {};
    MUTABLE_PROPERTIES.forEach(param => {
      data[param] = [...card[param], ''];
    });
    setFields(data);
  });

  useEffect(() => {
    if (card) {
      setParams();
    }
  }, [wordCards]);

  const cleanFormData = () => {
    const data = Object.entries(fields);
    const cleadData = {};
    let hasChanges = false;
    data.forEach(([key, value]) => {
      const filtered = value.filter(Boolean);
      const isChanged =
        filtered.some(elem => !card[key].includes(elem)) ||
        card[key].length !== filtered.length;
      if (isChanged) {
        cleadData[key] = filtered;
        hasChanges = true;
      }
    });
    if (cleadData.defs && !cleadData.defs.length) {
      setWarning('defs field can not be empty');
      return null;
    }
    if (!hasChanges) {
      setWarning('Nothing has changed');
      return null;
    }
    return cleadData;
  };

  const inputHandler = useCallback(
    e => {
      const { name, value } = e.target;
      const [fieldId, index] = name.split('_');
      if (!fields?.[fieldId]) {
        return;
      }
      const newVal = fields?.[fieldId];
      newVal[index] = value;
      setFields({ ...fields, [fieldId]: newVal });
    },
    [fields]
  );

  const deleteHandler = useCallback(
    (key, index) => {
      const newVal = fields[key];
      newVal.splice(index, 1);
      setFields({ ...fields, [key]: newVal });
    },
    [fields]
  );

  const addHandler = useCallback(
    key => {
      if (!fields[key][fields[key].length - 1]) {
        return;
      }
      const newVal = [...fields[key], ''];
      setFields({ ...fields, [key]: newVal });
    },
    [fields]
  );

  const closeHandler = useCallback(() => {
    setWarning('');
  }, []);

  const submitHandler = useCallback(
    e => {
      e.preventDefault();
      const cleanData = cleanFormData();
      if (!cleanData) {
        return;
      }
      const stringified = JSON.stringify(cleanData);
      const url = `${wordsUrl}edit/${card.id}`;
      const method = 'PATCH';
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      };
      fetchFunc({
        url,
        requestOptions: { body: stringified, headers, method }
      });
    },
    [fetchFunc, fields]
  );
  useEffect(() => {
    if (result) {
      setWarning(result.message);
      updateCards();
    }
  }, [result]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <article>
      {warning && (
        <PopUp open={warning} onClose={closeHandler}>
          <Warning text={warning} buttonHandler={closeHandler} />
        </PopUp>
      )}
      {error && <ErrorContainer>error: {error.message}</ErrorContainer>}
      {card && (
        <div>
          <WordCard word={card} />
          <h2 className={commonStyles.subheading}>
            Edit <i>{card.name}</i> fields
          </h2>
          {fields && (
            <form onSubmit={submitHandler}>
              {MUTABLE_PROPERTIES.map(key => {
                return (
                  <fieldset title={key} key={key} className={styles.formField}>
                    <legend>{key}</legend>
                    {fields[key].map((entity, i) => {
                      const isLast = i === fields[key].length - 1;
                      return (
                        <div className={styles.inputContainer} key={entity}>
                          <input
                            className={styles.input}
                            value={entity}
                            onChange={inputHandler}
                            name={`${key}_${i}`}
                          />
                          {isLast ? (
                            <IconButton
                              kind="add"
                              iconHint={`add an example for ${card.name} card`}
                              size="M"
                              onClick={() => addHandler(key)}
                            />
                          ) : (
                            <IconButton
                              kind="delete"
                              iconHint={`delete ${card.name} card`}
                              size="M"
                              onClick={() => deleteHandler(key, i)}
                            />
                          )}
                        </div>
                      );
                    })}
                  </fieldset>
                );
              })}
              <div className={commonStyles.buttonSet}>
                <Button type="submit">Save changes</Button>
                <Button kind="purple" onClick={setParams}>
                  Reset
                </Button>
              </div>
            </form>
          )}
        </div>
      )}
    </article>
  );
};

EditWord.propTypes = {
  wordId: PropTypes.string.isRequired
};
