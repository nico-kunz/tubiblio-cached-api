import express, { Express } from 'express';
import fs from 'fs';
import { authorRouter } from './routes/authorsRouter';
import { groupsRouter } from './routes/groupsRouter';

const app: Express = express();
const PORT = 3000;
const DATA_FOLDER = 'data/'


app.use('/authors', authorRouter);
app.use('/groups', groupsRouter);

app.listen(
    PORT, 
    () => {
        console.log(`It's alive on http://localhost:${PORT}`);
        fs.promises.mkdir(DATA_FOLDER, { recursive: true }).catch(err => console.log(err));
    }
);