import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
    },
    skills: [{ type: String }],
    location: { type: String, default: 'Remote' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Job = mongoose.model('Job', jobSchema);
export default Job;
