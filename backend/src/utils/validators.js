import { body } from 'express-validator';

export const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['candidate', 'recruiter']).withMessage('Invalid role'),
];

export const loginValidation = [
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

export const jobValidation = [
  body('title').trim().notEmpty().withMessage('Job title is required'),
  body('company').trim().notEmpty().withMessage('Company name is required'),
  body('description').trim().isLength({ min: 20 }).withMessage('Description must be at least 20 characters'),
  body('skills').optional().isArray(),
  body('location').optional().trim(),
];

export const matchValidation = [
  body('jobDescription').trim().isLength({ min: 20 }).withMessage('Job description must be at least 20 characters'),
  body('resumeId').optional().isMongoId().withMessage('Invalid resume ID'),
];

export const applyValidation = [
  body('jobId').isMongoId().withMessage('Valid job ID is required'),
  body('resumeId').isMongoId().withMessage('Valid resume ID is required'),
];
