import express, { Express } from 'express';
import fs from 'fs';
import config from 'config';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

import { authorRouter } from './routes/authorsRouter';
import { groupsRouter } from './routes/groupsRouter';
import { injectionsRouter } from './routes/injectionsRouter';

const app: Express = express();
const PORT: number = config.get('server.port');
const HOST: string = config.get('server.host');

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/authors', authorRouter);
app.use('/groups', groupsRouter);
app.use('/injections', injectionsRouter);

app.listen(PORT, HOST, () => {
    console.log(`It's alive on http://${HOST}:${PORT}`);
    fs.promises
        .mkdir('data/', { recursive: true })
        .catch((err) => console.log(err));
});

export { app };
