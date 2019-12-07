import express from 'express';
import {renderer} from "./helpers/renderer";
import {createStoreFunc} from './helpers/createStore';

const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
    const store = createStoreFunc();
    res.send(renderer(req.url, store));
});

app.listen(3000, () => {
    console.log('Running on port 3000');
});