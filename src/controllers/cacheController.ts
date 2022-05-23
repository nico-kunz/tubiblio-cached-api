import { Request, Response } from 'express';
import fs from 'fs';
import { author_name_update, author_orcid_update } from './authorsController';
import { seemoo_update } from './groupsController';


export const update_cache = async (req: Request, res: Response) => {
    let files = await fs.promises.readdir('data/');

    // remove seemoo file
    files = files.filter(file => !file.includes('seemoo'))
    
    // remove file extensions
    const files2 = files.map(file => file.split('.')[0]);
    console.log(files2)
    console.log(files)

    const ORCID_REGEX = /(\d{4}-){3}\d{3}(\d|X)/;

    let remaining: string[] = [];
    const orcids = files2.filter(fileName => {
        if (ORCID_REGEX.test(fileName)) {
            return true;
        } else {
            remaining.push(fileName);
            return false;
        }
    });

    seemoo_update();

    const promises = [];

    for (const file of orcids) {
        promises.push(author_orcid_update(file).catch(err => console.error(err)));
    }

    for (const file of remaining) {
        promises.push(author_name_update(file));
    }

    Promise.all(promises).then(() => res.send('done'));
};

export const clear_cache = async (req: Request, res: Response) => {
    res.status(501).send('Not implemented');
}
