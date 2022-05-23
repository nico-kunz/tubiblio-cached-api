import config from 'config';
import { Request, Response } from 'express';
import { injectData } from '../utils/injections';
import { downloadJSONFile, getJSONFile } from '../utils/jsonHelper';

const URL_ALL: string = config.get('download_urls.seemoo.url');

export const seemoo_get = async (req: Request, res: Response) => {
    let url = URL_ALL;

    getJSONFile(url, `data/seemoo.json`)
        .then(data => injectData(data))
        .then(data => res.status(200).json(data))
        .catch((err) => {
            console.error(err);
            res.status(500).send(err);
        });
};

export const seemoo_update = async () => {
    return downloadJSONFile(URL_ALL, `data/seemoo.json`).then(() => console.log("seemoo done"));
}

