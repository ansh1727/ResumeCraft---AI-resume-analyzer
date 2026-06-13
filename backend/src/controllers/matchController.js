import Resume from '../models/Resume.js';
import { parseResumePDF } from '../services/resumeParser.js';
import { matchJobDescription, enhanceExtractedData } from '../services/geminiService.js';

export const matchJob = async (req, res, next) => {
  try {
    const { jobDescription, resumeId } = req.body;

    if (!jobDescription || jobDescription.trim().length < 20) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid job description (min 20 characters).',
      });
    }

    let resumeData;

    if (resumeId) {
      const resume = await Resume.findById(resumeId);
      if (!resume) {
        return res.status(404).json({ success: false, message: 'Resume not found.' });
      }
      if (resume.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ success: false, message: 'Not authorized.' });
      }
      resumeData = resume.extractedData;
    } else if (req.file) {
      resumeData = await parseResumePDF(req.file.path);
      if (process.env.GEMINI_API_KEY) {
        const enhanced = await enhanceExtractedData(resumeData.rawText);
        if (enhanced) resumeData = { ...resumeData, ...enhanced, rawText: resumeData.rawText };
      }
    } else {
      return res.status(400).json({
        success: false,
        message: 'Please provide a resume ID or upload a PDF resume.',
      });
    }

    const matchResult = await matchJobDescription(resumeData, jobDescription);

    res.json({
      success: true,
      message: 'Job match analysis complete.',
      match: {
        matchPercentage: matchResult.matchPercentage,
        matchScore: matchResult.matchScore,
        missingKeywords: matchResult.missingKeywords,
        matchingSkills: matchResult.matchingSkills,
        improvementSuggestions: matchResult.improvementSuggestions,
        atsCompatibilityScore: matchResult.atsCompatibilityScore,
      },
    });
  } catch (error) {
    next(error);
  }
};
