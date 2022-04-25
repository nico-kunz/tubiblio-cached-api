import config from 'config';
import { Request, Response } from 'express';
import { getJSONFile } from '../utils/jsonHelper';

const URL_ALL : string = config.get('download_urls.seemoo.url');

export const seemoo_get = async (req: Request, res: Response) => {
    let url = URL_ALL;

    getJSONFile(url, `data/seemoo.json`).then(data => res.json(data));
};

