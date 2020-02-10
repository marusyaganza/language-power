import React from 'react';
import {renderRoutes} from 'react-router-config'
import {Header} from "./components/header/header";
import './style.css';

const AppComponent = ({route}) => {
    return (
        <div className="page-content">
            <Header/>
            {renderRoutes(route.routes)}
        </div>)
};

export const App = {
    component: AppComponent
};