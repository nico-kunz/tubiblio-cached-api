import express, { Express, Request, Response } from 'express';
import fs from 'fs';
import config from 'config';
import { authorRouter } from './routes/authorsRouter';
import { groupsRouter } from './routes/groupsRouter';
import { addInjection, getInjections, removeInjection } from './utils/injections';
import { getJSONFile } from './utils/jsonHelper';
import { injectionsRouter } from './routes/injectionsRouter';

const app: Express = express();
const PORT: number = config.get('server.port');
const HOST: string = config.get('server.host');

app.use(express.json());

app.use('/authors', authorRouter);
app.use('/groups', groupsRouter);
app.use('/injections', injectionsRouter);

app.listen(PORT, HOST, () => {
    console.log(`It's alive on http://${HOST}:${PORT}`);
    fs.promises
        .mkdir('data/', { recursive: true })
        .catch((err) => console.log(err));
});

const URL_ALL: string = config.get('download_urls.seemoo.url');

app.get('/test', async (req: Request, res: Response) => {
    const injections = await getInjections();
    let data = await getJSONFile(URL_ALL, 'data/seemoo.json') as any[];
    const injectedData = data.map(dataElem => {
        const index = injections.findIndex(injElem => injElem.eprintid === dataElem.eprintid);
        if(index != -1) {
            dataElem.official_url = injections[index].official_url;
        }
        return dataElem;
    })

    res.send(injectedData);
});

