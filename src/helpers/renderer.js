import {renderToString} from "react-dom/server";
import {StaticRouter} from 'react-router-dom';
import React from "react";
import {Routes} from "../Routes";
import {Provider} from "react-redux";
import {renderRoutes} from "react-router-config";
import serialize from 'serialize-javascript';

export function renderer(url, store) {
    const content = renderToString(
        <Provider store={store}>
        <StaticRouter location={url} context={{}}>
            <div id="page">{renderRoutes(Routes)}</div>
        </StaticRouter>
        </Provider>
    );
    return `
    <html lang="en">
        <head>
            <title>Language power</title>
            <link rel="icon" type="image/x-icon" href="../../favicon.ico">
            <link rel="stylesheet" href="main.css">
        </head>
        <body>
            <div id="root">${content}</div>
            <script> window.APP_STATE = ${serialize(store.getState())} </script>
            <script src="client.js"></script>
        </body>
    </html>
    `;
}
