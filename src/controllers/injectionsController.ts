import { Request, Response } from 'express';
import { addInjection, getInjections, removeInjection } from '../utils/injections';

export const injections_put = async (req: Request, res: Response) => {
    const id = req.body.eprintid;
    const link = req.body.official_url;

    await addInjection({eprintid: id, official_url: link});
    res.status(200).send("Success");
};

export const injections_delete = async (req: Request, res: Response) => {
    const eprintId = req.body.eprintid;
    await removeInjection(eprintId);
    res.status(200).send("Success");
};

export const injections_get = async (req: Request, res: Response) => {
    const injections = await getInjections();
    res.status(200).json(injections);
}
