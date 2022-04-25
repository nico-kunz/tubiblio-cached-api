import express, { Express } from 'express';
import fs from 'fs';
import config from 'config';
import { authorRouter } from './routes/authorsRouter';
import { groupsRouter } from './routes/groupsRouter';

const app : Express = express();
const PORT : number = config.get('server.port');
const HOST : string = config.get('server.host');


app.use('/authors', authorRouter);
app.use('/groups', groupsRouter);

app.listen(
    PORT,
    HOST, 
    () => {
        console.log(`It's alive on http://${HOST}:${PORT}`);
        fs.promises.mkdir("data/", { recursive: true }).catch(err => console.log(err));
    }
);