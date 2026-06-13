import express from 'express';
import { matchJob } from '../controllers/matchController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { matchValidation } from '../utils/validators.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.use(protect);
router.use(authorize('candidate'));

router.post('/', upload.single('resume'), matchValidation, validate, matchJob);

export default router;
