import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      required: true,
    },
    atsScore: { type: Number, min: 0, max: 100 },
    technicalSkillScore: { type: Number, min: 0, max: 100 },
    projectQualityScore: { type: Number, min: 0, max: 100 },
    resumeFormattingScore: { type: Number, min: 0, max: 100 },
    employabilityScore: { type: Number, min: 0, max: 100 },
    missingSkills: [{ type: String }],
    weakSections: [{ type: String }],
    suggestions: [{ type: String }],
    recommendedTechnologies: [{ type: String }],
    recommendedProjects: [{ type: String }],
    recommendedCertifications: [{ type: String }],
    fullAnalysis: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

const Analysis = mongoose.model('Analysis', analysisSchema);
export default Analysis;
