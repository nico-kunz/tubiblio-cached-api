
import { Request, Response } from 'express';
import { getJSONFile } from '../utils/jsonHelper';

const URL_AUTHORNAME = 'https://tubiblio.ulb.tu-darmstadt.de/cgi/search/archive/advanced/export_tubiblio_JSON.js?screen=Search&dataset=archive&_action_export=1&output=JSON&exp=0%7C1%7C-date%2Fcreators_name%2Ftitle%7Carchive%7C-%7Ccreators_name%2Feditors_name%3Acreators_name%2Feditors_name%3AALL%3AEQ%3A___AUTHORNAME___%7Cdivisions%3Adivisions%3AANY%3AEQ%3Afb20_smn%7C-%7Ceprint_status%3Aeprint_status%3AANY%3AEQ%3Aarchive%7Cmetadata_visibility%3Ametadata_visibility%3AANY%3AEQ%3Ashow&n='
const URL_ORCID = 'https://tubiblio.ulb.tu-darmstadt.de/cgi/search/archive/advanced/export_tubiblio_JSON.js?dataset=archive&screen=Search&_action_export=1&output=JSON&exp=0%7C1%7C-date%2Fcreators_name%2Ftitle%7Carchive%7C-%7Ccreators_id%3Acreators_id%3AANY%3AEX%3A__ORCID__%7Cdivisions%3Adivisions%3AANY%3AEQ%3Afb20_smn%7C-%7Ceprint_status%3Aeprint_status%3AANY%3AEQ%3Aarchive%7Cmetadata_visibility%3Ametadata_visibility%3AANY%3AEQ%3Ashow&n='


export const author_name_get = async (req: Request, res: Response) => {
    let url = URL_AUTHORNAME;
    url = url.replace("__AUTHORNAME__", req.params.name);

    getJSONFile(url, `data/${req.params.name.replace("+", "")}.json`).then(data => res.json(data));
};

export const author_orcid_get = async (req: Request, res: Response) => {
    let url = URL_ORCID;
    url = url.replace("__ORCID__", req.params.orcid)
    
    getJSONFile(url, `data/${req.params.orcid}.json`).then(data => res.json(data));
};
