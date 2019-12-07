import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Home} from "./pages/home/Home";
import {NotFound} from "./pages/not-found/NotFound";
import {WordCard} from "./components/word-card";

const Routes = () => {
    return (
        <div className="page">
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/words" component={WordCard}/>
                <Route path="*" component={NotFound}/>
            </Switch>
        </div>
    )
};

export {Routes}