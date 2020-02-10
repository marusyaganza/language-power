import React from 'react';

const NotFound = ({staticContext={}}) => {
    staticContext.notFound = true;
    console.log('context', staticContext);
    return (
        <main className="content">
            <h1 className="main-heading">Not Found</h1>
            <a href="/">Go to the homepage</a>
        </main>
    )
};

export {NotFound}