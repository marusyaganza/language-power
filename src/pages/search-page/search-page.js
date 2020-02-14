import React from 'react';
import './search-page.css';
import {WordSearch} from '../../widgets/word-search/word-search';

export const SearchPage = () => {
    return (
        <main>
            <h1 className="main-heading">Search Page</h1>
            <WordSearch />
        </main>
    )
}