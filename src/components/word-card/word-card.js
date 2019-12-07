import React from 'react';
import {useEffect} from 'react';
// Use mocks to reduce requests while developing visual part
// import mock from '../../../mocks/yandex.mock.json';
import uuid from 'uuid';

const WordCardComponent = ({word, words, fetchWord} = {word: 'hack'}) => {
    useEffect(() => fetchWord(word),[word]);
    const renderWords = () => {
        return (
            words.map(item => <li key={uuid()}>{item.tr[0].text}</li>)
        )
    };
    return (
        <article>
            <h2>{word}</h2>
            <ul>
                {renderWords()}
            </ul>
        </article>
    )
};

export {WordCardComponent}

