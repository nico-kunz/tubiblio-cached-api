import express, { Express } from 'express';
import fs from 'fs';
import config from 'config';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import { authorRouter } from './routes/authorsRouter';
import { groupsRouter } from './routes/groupsRouter';
import { injectionsRouter } from './routes/injectionsRouter';
import { cacheRouter } from './routes/cacheRoute';

const app: Express = express();
const PORT: number = config.get('server.port');
const HOST: string = config.get('server.host');

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/authors', authorRouter);
app.use('/groups', groupsRouter);
app.use('/injections', injectionsRouter);
app.use('/cache', cacheRouter);


app.listen(PORT, HOST, () => {
    console.log(`It's alive on http://${HOST}:${PORT}`);

    // create data folder if it doesn't exist
    fs.promises
        .mkdir('data/', { recursive: true })
        .catch((err) => console.log(err));

    // create injections.json if it doesn't exist
    fs.promises.readFile('injections.json').then(
        () => {},
        () => {
            fs.writeFile(
                'injections.json',
                '',
                (err) => err && console.error(err)
            );
        }
    );
});


export { app };
