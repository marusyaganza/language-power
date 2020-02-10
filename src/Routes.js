import React from 'react';
import {Home} from "./pages/home/Home";
import {App} from "./App";
import {NotFound} from "./pages/not-found/NotFound";
import {WordCard} from "./components/word-card";

const Routes = [
    {
        ...App,
        routes: [
            {
                path: '/',
                component: Home,
                exact: true
            },
            {
                ...WordCard,
                path: '/words',
            },
            {
                // path: '*',
                component: NotFound
            }
        ]
    }
];



export {Routes}