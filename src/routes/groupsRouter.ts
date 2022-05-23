import express from 'express';
import { seemoo_get } from '../controllers/groupsController';

const router = express.Router();

router.get('/seemoo', seemoo_get);

export { router as groupsRouter };
