
import { Request, Response } from 'express';
import { getJSONFile } from '../utils/jsonHelper';

const URL_ALL = "https://tubiblio.ulb.tu-darmstadt.de/cgi/search/archive/advanced/export_tubiblio_JSON.js?screen=Search&dataset=archive&_action_export=1&output=JSON&exp=0%7C1%7C-date%2Fcreators_name%2Ftitle%7Carchive%7C-%7Cdivisions%3Adivisions%3AANY%3AEQ%3Afb20_smn%7C-%7Ceprint_status%3Aeprint_status%3AANY%3AEQ%3Aarchive%7Cmetadata_visibility%3Ametadata_visibility%3AANY%3AEQ%3Ashow&n="


export const seemoo_get = async (req: Request, res: Response) => {
    let url = URL_ALL;

    getJSONFile(url, `data/seemoo.json`).then(data => res.json(data));
};

