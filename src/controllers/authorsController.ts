import config from 'config';
import { Request, Response } from 'express';
import { injectData } from '../utils/injections';
import { downloadJSONFile, getJSONFile } from '../utils/jsonHelper';

type UrlWithPlaceholder = { url: string, placeholder: string };

const URL_AUTHORNAME: UrlWithPlaceholder = config.get('download_urls.by_name');
const URL_ORCID: UrlWithPlaceholder = config.get('download_urls.by_orcid');

export const author_name_get = async (req: Request, res: Response) => {
    // encode parameter to support queries with non-ascii characters
    const encodedName = encodeURI(req.params.name);
    let url = URL_AUTHORNAME.url;
    url = url.replace(URL_AUTHORNAME.placeholder, encodedName);

    getJSONFile(url, `data/${req.params.name.replace('+', '_')}.json`)
        .then(data => injectData(data))
        .then(data => res.status(200).json(data))
        .catch((err) => {
            console.error(err);
            res.status(500).send(err);
        });
};

export const author_name_update = async (name: string) => {
    let url = URL_AUTHORNAME.url;
    url = url.replace(URL_AUTHORNAME.placeholder, encodeURI(name.replace('_', '+')));

    return downloadJSONFile(url, `data/${name.replace('+', '_')}.json`);
}

export const author_orcid_get = async (req: Request, res: Response) => {
    let url = URL_ORCID.url;
    url = url.replace(URL_ORCID.placeholder, req.params.orcid)
    
    getJSONFile(url, `data/${req.params.orcid}.json`)
        .then(data => injectData(data))
        .then(data => res.status(200).json(data))
        .catch((err) => {
            console.error(err);
            res.status(500).send(err);
        });
};

export const author_orcid_update = async (orcid: string) => {
    let url = URL_ORCID.url;
    url = url.replace(URL_ORCID.placeholder, orcid);
    return downloadJSONFile(url, `data/${orcid}.json`);
}
