import express from 'express';
import {renderer} from "./helpers/renderer";

const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
    res.send(renderer(req.path));
});

app.listen(3000, () => {
    console.log('Running on port 3000');
});