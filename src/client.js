import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import {reducers} from "./reducers";

const store = createStore(reducers, {}, applyMiddleware(thunk));

import {Routes} from "./Routes";

ReactDOM.hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root')
);