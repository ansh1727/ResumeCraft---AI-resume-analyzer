import Job from '../models/Job.js';
import Application from '../models/Application.js';
import Resume from '../models/Resume.js';
import Analysis from '../models/Analysis.js';
import { matchJobDescription } from '../services/geminiService.js';

export const createJob = async (req, res, next) => {
  try {
    const { title, company, description, skills, location } = req.body;

    const job = await Job.create({
      recruiter: req.user._id,
      title,
      company,
      description,
      skills: skills || [],
      location: location || 'Remote',
    });

    res.status(201).json({ success: true, message: 'Job posted successfully.', job });
  } catch (error) {
    next(error);
  }
};

export const getMyJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ recruiter: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: jobs.length, jobs });
  } catch (error) {
    next(error);
  }
};

export const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ isActive: true })
      .populate('recruiter', 'name email')
      .sort({ createdAt: -1 });
    res.json({ success: true, count: jobs.length, jobs });
  } catch (error) {
    next(error);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate('recruiter', 'name email');
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found.' });
    }
    res.json({ success: true, job });
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (req, res, next) => {
  try {
    let job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found.' });
    }

    if (job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    const { title, company, description, skills, location, isActive } = req.body;
    job = await Job.findByIdAndUpdate(
      req.params.id,
      { title, company, description, skills, location, isActive },
      { new: true, runValidators: true }
    );

    res.json({ success: true, message: 'Job updated successfully.', job });
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found.' });
    }

    if (job.recruiter.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    await Application.deleteMany({ job: job._id });
    await job.deleteOne();

    res.json({ success: true, message: 'Job deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

export const applyToJob = async (req, res, next) => {
  try {
    const { jobId, resumeId } = req.body;

    const job = await Job.findById(jobId);
    if (!job || !job.isActive) {
      return res.status(404).json({ success: false, message: 'Job not found or inactive.' });
    }

    const resume = await Resume.findById(resumeId);
    if (!resume || resume.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ success: false, message: 'Resume not found.' });
    }

    const existing = await Application.findOne({ candidate: req.user._id, job: jobId });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Already applied to this job.' });
    }

    const matchResult = await matchJobDescription(resume.extractedData, job.description);

    const application = await Application.create({
      candidate: req.user._id,
      job: jobId,
      resume: resumeId,
      matchScore: matchResult.matchScore,
      matchPercentage: matchResult.matchPercentage,
      missingKeywords: matchResult.missingKeywords,
      matchingSkills: matchResult.matchingSkills,
      improvementSuggestions: matchResult.improvementSuggestions,
      atsCompatibilityScore: matchResult.atsCompatibilityScore,
      matchDetails: matchResult,
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully.',
      application,
    });
  } catch (error) {
    next(error);
  }
};

export const getJobApplicants = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found.' });
    }

    if (job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    const applicants = await Application.find({ job: req.params.id })
      .populate('candidate', 'name email')
      .populate('resume', 'fileName resumeUrl extractedData')
      .sort({ matchScore: -1 });

    const applicantsWithAnalysis = await Promise.all(
      applicants.map(async (app) => {
        const analysis = await Analysis.findOne({
          user: app.candidate._id,
          resume: app.resume._id,
        }).sort({ createdAt: -1 });

        return {
          ...app.toObject(),
          latestAnalysis: analysis,
        };
      })
    );

    res.json({ success: true, count: applicantsWithAnalysis.length, applicants: applicantsWithAnalysis });
  } catch (error) {
    next(error);
  }
};

export const getMyApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ candidate: req.user._id })
      .populate('job', 'title company description')
      .populate('resume', 'fileName')
      .sort({ appliedAt: -1 });

    res.json({ success: true, count: applications.length, applications });
  } catch (error) {
    next(error);
  }
};
