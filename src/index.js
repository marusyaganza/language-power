import express from 'express';
import {renderer} from "./helpers/renderer";
import {createStoreFunc} from './helpers/createStore';
import {matchRoutes} from "react-router-config";
import {Routes} from "./Routes";

const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
    const store = createStoreFunc();
    const {url} = req;
    const promises = matchRoutes(Routes, url).map(({route}) => {
        const {loadData} = route;
        if(loadData) {
            return loadData(store)
        }
    });
    Promise.all(promises).then(() => {
            res.send(renderer(url, store));
        }
    )
        .catch((err) => console.log('error', err));
});

app.listen(3000, () => {
    console.log('Running on port 3000');
});