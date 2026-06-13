import express from 'express';
import {
  uploadResume,
  getMyResumes,
  getResumeById,
  deleteResume,
  analyzeResumeById,
  getMyAnalyses,
  getAnalysisById,
} from '../controllers/resumeController.js';
import { protect, authorize } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.use(protect);

router.post('/upload', authorize('candidate'), upload.single('resume'), uploadResume);
router.get('/', getMyResumes);
router.get('/analyses', authorize('candidate'), getMyAnalyses);
router.get('/analyses/:id', getAnalysisById);
router.get('/:id', getResumeById);
router.delete('/:id', authorize('candidate'), deleteResume);
router.post('/:id/analyze', authorize('candidate'), analyzeResumeById);

export default router;
