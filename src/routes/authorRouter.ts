import express from 'express';
import { author_name_get, author_orcid_get } from '../controllers/authorsController';


const router = express.Router();

router.get('/name/:name', author_name_get);

router.get('/orcid/:orcid', author_orcid_get);

export { router as authorRouter };