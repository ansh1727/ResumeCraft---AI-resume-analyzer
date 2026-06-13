import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      required: true,
    },
    matchScore: { type: Number, min: 0, max: 100, default: 0 },
    matchPercentage: { type: Number, min: 0, max: 100, default: 0 },
    missingKeywords: [{ type: String }],
    matchingSkills: [{ type: String }],
    improvementSuggestions: [{ type: String }],
    atsCompatibilityScore: { type: Number, min: 0, max: 100, default: 0 },
    matchDetails: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: { createdAt: 'appliedAt', updatedAt: true } }
);

applicationSchema.index({ candidate: 1, job: 1 }, { unique: true });

const Application = mongoose.model('Application', applicationSchema);
export default Application;
