import fs from 'fs';
import path from 'path';
import Resume from '../models/Resume.js';
import Analysis from '../models/Analysis.js';
import Application from '../models/Application.js';
import { parseResumePDF } from '../services/resumeParser.js';
import { analyzeResume, enhanceExtractedData } from '../services/geminiService.js';

export const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a PDF resume.' });
    }

    let extractedData = await parseResumePDF(req.file.path);

    if (process.env.GEMINI_API_KEY && !/^(your|replace|example)/i.test(process.env.GEMINI_API_KEY.trim())) {
      const enhanced = await enhanceExtractedData(extractedData.rawText);
      if (enhanced) {
        extractedData = { ...extractedData, ...enhanced, rawText: extractedData.rawText };
      }
    }

    const resume = await Resume.create({
      user: req.user._id,
      fileName: req.file.originalname,
      resumeUrl: `/uploads/${req.file.filename}`,
      extractedData,
    });

    res.status(201).json({
      success: true,
      message: 'Resume uploaded successfully.',
      resume,
    });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    next(error);
  }
};

export const getMyResumes = async (req, res, next) => {
  try {
    const resumes = await Resume.find({ user: req.user._id }).sort({ uploadedAt: -1 });
    res.json({ success: true, count: resumes.length, resumes });
  } catch (error) {
    next(error);
  }
};

export const getResumeById = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found.' });
    }

    const isOwner = resume.user.toString() === req.user._id.toString();
    const isRecruiterOrAdmin = ['recruiter', 'admin'].includes(req.user.role);

    if (!isOwner && !isRecruiterOrAdmin) {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    res.json({ success: true, resume });
  } catch (error) {
    next(error);
  }
};

export const deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found.' });
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    const filePath = path.join(process.cwd(), resume.resumeUrl.replace(/^\//, ''));
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await Analysis.deleteMany({ resume: resume._id });
    await Application.deleteMany({ resume: resume._id });
    await resume.deleteOne();

    res.json({ success: true, message: 'Resume deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

export const analyzeResumeById = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found.' });
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    const aiResult = await analyzeResume(resume.extractedData, resume.extractedData.rawText || '');

    const analysis = await Analysis.create({
      user: req.user._id,
      resume: resume._id,
      atsScore: aiResult.atsScore,
      technicalSkillScore: aiResult.technicalSkillScore,
      projectQualityScore: aiResult.projectQualityScore,
      resumeFormattingScore: aiResult.resumeFormattingScore,
      employabilityScore: aiResult.employabilityScore,
      missingSkills: aiResult.missingSkills,
      weakSections: aiResult.weakSections,
      suggestions: aiResult.suggestions,
      recommendedTechnologies: aiResult.recommendedTechnologies,
      recommendedProjects: aiResult.recommendedProjects,
      recommendedCertifications: aiResult.recommendedCertifications,
      fullAnalysis: aiResult,
    });

    res.status(201).json({
      success: true,
      message: 'Resume analyzed successfully.',
      analysis,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyAnalyses = async (req, res, next) => {
  try {
    const analyses = await Analysis.find({ user: req.user._id })
      .populate('resume', 'fileName resumeUrl')
      .sort({ createdAt: -1 });
    res.json({ success: true, count: analyses.length, analyses });
  } catch (error) {
    next(error);
  }
};

export const getAnalysisById = async (req, res, next) => {
  try {
    const analysis = await Analysis.findById(req.params.id).populate('resume', 'fileName resumeUrl extractedData');
    if (!analysis) {
      return res.status(404).json({ success: false, message: 'Analysis not found.' });
    }

    const isOwner = analysis.user.toString() === req.user._id.toString();
    const isRecruiterOrAdmin = ['recruiter', 'admin'].includes(req.user.role);

    if (!isOwner && !isRecruiterOrAdmin) {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    res.json({ success: true, analysis });
  } catch (error) {
    next(error);
  }
};
