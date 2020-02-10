import express from 'express';
import {renderer} from "./helpers/renderer";
import {createStoreFunc} from './helpers/createStore';
import {matchRoutes} from "react-router-config";
import proxy from 'express-http-proxy';
import {Routes} from "./Routes";
import {YANDEX} from "../api-data";

const app = express();

app.use(
    '/api',
    // proxy('http://react-ssr-api.herokuapp.com', {
    proxy(YANDEX, {
        proxyReqOptDecorator(opts) {
            opts.headers['x-forwarded-host'] = 'localhost:3000';
            return opts;
        }
    })
);
app.use(express.static('public'));

app.get('*', (req, res) => {
    const store = createStoreFunc(req);
    const {url} = req;
    const promises = matchRoutes(Routes, url).map(({route}) => {
        const {loadData} = route;
        if(loadData) {
            return loadData(store)
        }
    });
    Promise.all(promises).then(() => {
        const context = {};
        const content = renderer(url, store, context);
        if(context.notFound) {
            res.status(404);
        }
            res.send(content);
        }
    )
        .catch((err) => console.log('error', err));
});

app.listen(3000, () => {
    console.log('Running on port 3000');
});