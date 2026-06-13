import mongoose from 'mongoose';

const extractedDataSchema = new mongoose.Schema(
  {
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    skills: [{ type: String }],
    education: [{ type: String }],
    projects: [{ type: String }],
    experience: [{ type: String }],
    certifications: [{ type: String }],
    rawText: { type: String, default: '' },
  },
  { _id: false }
);

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fileName: { type: String, required: true },
    resumeUrl: { type: String, required: true },
    extractedData: { type: extractedDataSchema, default: () => ({}) },
  },
  { timestamps: { createdAt: 'uploadedAt', updatedAt: false } }
);

const Resume = mongoose.model('Resume', resumeSchema);
export default Resume;
