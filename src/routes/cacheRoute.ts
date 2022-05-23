import express from 'express';
import { clear_cache, update_cache } from '../controllers/cacheController';

const router = express.Router();

router.get('/update', update_cache);
router.get('/clear', clear_cache);

export { router as cacheRouter };
