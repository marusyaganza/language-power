import {renderToString} from "react-dom/server";
import {StaticRouter} from 'react-router-dom';
import React from "react";
import {Routes} from "../Routes";
import {Provider} from "react-redux";

export function renderer(url, store) {
    const content = renderToString(
        <Provider store={store}>
        <StaticRouter location={url} context={{}}>
            <Routes/>
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
            <script src="client.js"></script>
        </body>
    </html>
    `;
}
