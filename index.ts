import express, { Express, Request, Response } from 'express';
import fs from 'fs';
import axios from 'axios'

const app: Express = express();
const PORT = 3000;
const URL_ALL = "https://tubiblio.ulb.tu-darmstadt.de/cgi/search/archive/advanced/export_tubiblio_JSON.js?screen=Search&dataset=archive&_action_export=1&output=JSON&exp=0%7C1%7C-date%2Fcreators_name%2Ftitle%7Carchive%7C-%7Cdivisions%3Adivisions%3AANY%3AEQ%3Afb20_smn%7C-%7Ceprint_status%3Aeprint_status%3AANY%3AEQ%3Aarchive%7Cmetadata_visibility%3Ametadata_visibility%3AANY%3AEQ%3Ashow&n="
const URL_ORCID = 'https://tubiblio.ulb.tu-darmstadt.de/cgi/search/archive/advanced/export_tubiblio_JSON.js?dataset=archive&screen=Search&_action_export=1&output=JSON&exp=0%7C1%7C-date%2Fcreators_name%2Ftitle%7Carchive%7C-%7Ccreators_id%3Acreators_id%3AANY%3AEX%3A__ORCID__%7Cdivisions%3Adivisions%3AANY%3AEQ%3Afb20_smn%7C-%7Ceprint_status%3Aeprint_status%3AANY%3AEQ%3Aarchive%7Cmetadata_visibility%3Ametadata_visibility%3AANY%3AEQ%3Ashow&n='
const URL_AUTHORNAME = 'https://tubiblio.ulb.tu-darmstadt.de/cgi/search/archive/advanced/export_tubiblio_JSON.js?screen=Search&dataset=archive&_action_export=1&output=JSON&exp=0%7C1%7C-date%2Fcreators_name%2Ftitle%7Carchive%7C-%7Ccreators_name%2Feditors_name%3Acreators_name%2Feditors_name%3AALL%3AEQ%3A___AUTHORNAME___%7Cdivisions%3Adivisions%3AANY%3AEQ%3Afb20_smn%7C-%7Ceprint_status%3Aeprint_status%3AANY%3AEQ%3Aarchive%7Cmetadata_visibility%3Ametadata_visibility%3AANY%3AEQ%3Ashow&n='
const DATA_FOLDER = 'data/'

app.get('/update', (req: Request, res: Response) => {
    downloadJSONFile(URL_ALL, DATA_FOLDER + "all.json").then(() => res.sendStatus(200)).catch((err) => res.send(err));
});

app.get('/all', (req: Request, res: Response) => {
    fs.readFile('data/SeemooAll.json', (err, data) => {
        try {
            if (err) throw err;
            else res.json(JSON.parse(data.toString()));
        } catch (error) {
            console.error(error);
            res.status(500).send((error as Error).message)
        }
    })
});

app.get('/test', (req: Request, res: Response) => {
    downloadJSONFile(URL_ALL, "test5.json").then(jsonData => res.json(jsonData));
});

app.get('/authors/orcid/:orcid', (req: Request<{orcid: string}>, res: Response) => {
    let url = URL_ORCID;
    url = url.replace("__ORCID__", req.params.orcid)
    
    getJSONFile(url, `${DATA_FOLDER}${req.params.orcid}.json`).then(data => res.json(data));
});

app.get('/authors/name/:name', (req: Request<{name:  string}>, res: Response) => {
    let url = URL_AUTHORNAME;
    url = url.replace("__AUTHORNAME__", req.params.name);

    getJSONFile(url, `${DATA_FOLDER}${req.params.name.replace("+", "")}.json`).then(data => res.json(data));
});

app.listen(
    PORT, 
    () => console.log(`It's alive on http://localhost:${PORT}`)
);

const getJSONFile = (async (url: string, path: string) => {
    //return fs.promises.readFile(path).then(res => res.toString()).catch(err => downloadJSONFile(url, path))
    let data;
    
    try {
        data = await fs.promises.readFile(path);
        data = JSON.parse(data.toString());
    } catch (error) {
        data = await downloadJSONFile(url, path);
    }   

    return data;

});


const downloadJSONFile = (async (url: string, path: string) => {
    const response = await axios.get(url);
    fs.writeFile(path, JSON.stringify(response.data), err => err && console.error(err))
    return response.data;
});