import express from 'express';
import { injections_delete, injections_get, injections_put } from '../controllers/injectionsController';

const router = express.Router();

router.get('/', injections_get);
router.put('/', injections_put);
router.delete('/', injections_delete);

export { router as injectionsRouter };
