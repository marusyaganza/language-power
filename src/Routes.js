import React from 'react';
import {Home} from "./pages/home/Home";
import {NotFound} from "./pages/not-found/NotFound";
import {WordCard} from "./components/word-card";

const Routes = [
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
        path: '*',
        component: NotFound
    }
];

export {Routes}