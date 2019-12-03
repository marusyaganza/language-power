import {renderToString} from "react-dom/server";
import {StaticRouter} from 'react-router-dom';
import React from "react";
import {Routes} from "../Routes";

export function renderer(url) {
    const content = renderToString(
        <StaticRouter location={url} context={{}}>
            <Routes/>
        </StaticRouter>
    );
    return `
    <html lang="en">
        <head>
            <title>Language power</title>
            <link rel="stylesheet" href="main.css">
        </head>
        <body>
            <div id="root">${content}</div>
            <script src="client.js"></script>
        </body>
    </html>
    `;
}
