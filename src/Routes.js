import React from 'react';
import {Route} from 'react-router-dom';
import {Home} from "./pages/home/Home";
import {NotFound} from "./pages/not-found/NotFound";

const Routes = () => {
    return (
        <div className="page">
            <Route exact path="/" component={Home}/>
            <Route component={NotFound}/>
        </div>
    )
};

export {Routes}