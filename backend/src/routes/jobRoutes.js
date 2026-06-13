import express from 'express';
import {
  createJob,
  getMyJobs,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  applyToJob,
  getJobApplicants,
  getMyApplications,
} from '../controllers/jobController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { jobValidation, applyValidation } from '../utils/validators.js';

const router = express.Router();

router.get('/', getAllJobs);

router.use(protect);

router.post('/', authorize('recruiter'), jobValidation, validate, createJob);
router.get('/recruiter/my-jobs', authorize('recruiter'), getMyJobs);
router.post('/apply', authorize('candidate'), applyValidation, validate, applyToJob);
router.get('/candidate/my-applications', authorize('candidate'), getMyApplications);
router.get('/:id/applicants', authorize('recruiter'), getJobApplicants);
router.get('/:id', getJobById);
router.put('/:id', authorize('recruiter'), jobValidation, validate, updateJob);
router.delete('/:id', authorize('recruiter', 'admin'), deleteJob);

export default router;
