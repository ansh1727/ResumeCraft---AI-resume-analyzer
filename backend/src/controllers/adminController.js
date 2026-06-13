import User from '../models/User.js';
import Resume from '../models/Resume.js';
import Analysis from '../models/Analysis.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';

export const getStats = async (req, res, next) => {
  try {
    const [totalUsers, totalResumes, totalAnalyses, totalJobs, totalApplications] =
      await Promise.all([
        User.countDocuments(),
        Resume.countDocuments(),
        Analysis.countDocuments(),
        Job.countDocuments(),
        Application.countDocuments(),
      ]);

    const usersByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } },
    ]);

    const recentUsers = await User.find()
      .select('name email role createdAt')
      .sort({ createdAt: -1 })
      .limit(5);

    const recentAnalyses = await Analysis.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalResumes,
        totalAnalyses,
        totalJobs,
        totalApplications,
        usersByRole: usersByRole.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
        recentUsers,
        recentAnalyses,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, count: users.length, users });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    if (user.role === 'admin') {
      return res.status(403).json({ success: false, message: 'Cannot delete admin users.' });
    }

    if (user._id.toString() === req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Cannot delete yourself.' });
    }

    const resumes = await Resume.find({ user: user._id });
    const resumeIds = resumes.map((r) => r._id);

    await Analysis.deleteMany({ user: user._id });
    await Application.deleteMany({ $or: [{ candidate: user._id }, { resume: { $in: resumeIds } }] });
    await Resume.deleteMany({ user: user._id });
    await Job.deleteMany({ recruiter: user._id });
    await user.deleteOne();

    res.json({ success: true, message: 'User deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

export const getAllJobsAdmin = async (req, res, next) => {
  try {
    const jobs = await Job.find()
      .populate('recruiter', 'name email')
      .sort({ createdAt: -1 });
    res.json({ success: true, count: jobs.length, jobs });
  } catch (error) {
    next(error);
  }
};

export const adminDeleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found.' });
    }

    await Application.deleteMany({ job: job._id });
    await job.deleteOne();

    res.json({ success: true, message: 'Job deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
