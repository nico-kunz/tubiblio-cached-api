import express, { Express, Request, Response } from 'express';
import fs from 'fs';
import fetch from 'node-fetch';

const app: Express = express();
const PORT = 3000;
const URL_ALL = "https://tubiblio.ulb.tu-darmstadt.de/cgi/search/archive/advanced/export_tubiblio_JSON.js?screen=Search&dataset=archive&_action_export=1&output=JSON&exp=0%7C1%7C-date%2Fcreators_name%2Ftitle%7Carchive%7C-%7Cdivisions%3Adivisions%3AANY%3AEQ%3Afb20_smn%7C-%7Ceprint_status%3Aeprint_status%3AANY%3AEQ%3Aarchive%7Cmetadata_visibility%3Ametadata_visibility%3AANY%3AEQ%3Ashow&n="


app.get('/', (req: Request, res: Response) => {  
    res.send('Express + Typescript is working!');
});

app.get('/update', (req: Request, res: Response) => {
    downloadJSONFile(URL_ALL, "test2.json").then(() => res.sendStatus(200)).catch((err) => res.send(err));
});

app.listen(
    PORT, 
    () => console.log(`It's alive on http://localhost:${PORT}`)
);

const downloadJSONFile = (async (url: string, path: string) => {
    await fetch(url)
        .then(res => res.json())
        .then(res => fs.writeFile(path, JSON.stringify(res), err => {
            if (err)
                console.error(err);
            })
        )
        .then(() => console.log('success'));
});