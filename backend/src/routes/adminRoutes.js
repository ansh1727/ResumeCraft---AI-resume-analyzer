import express from 'express';
import {
  getStats,
  getAllUsers,
  deleteUser,
  getAllJobsAdmin,
  adminDeleteJob,
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getStats);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.get('/jobs', getAllJobsAdmin);
router.delete('/jobs/:id', adminDeleteJob);

export default router;
