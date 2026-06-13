import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import EmptyState from '../../components/EmptyState';
import { jobAPI, resumeAPI } from '../../services';
import toast from 'react-hot-toast';
import { Briefcase, Send } from 'lucide-react';

const BrowseJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(null);

  useEffect(() => {
    Promise.all([jobAPI.getAll(), resumeAPI.getAll()])
      .then(([jobsRes, resumesRes]) => {
        setJobs(jobsRes.data.jobs);
        setResumes(resumesRes.data.resumes);
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleApply = async (jobId) => {
    if (resumes.length === 0) {
      return toast.error('Please upload a resume first');
    }
    setApplying(jobId);
    try {
      const { data } = await jobAPI.apply({ jobId, resumeId: resumes[0]._id });
      toast.success(`Applied! Match score: ${data.application.matchScore}%`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setApplying(null);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Browse Jobs</h1>
      <p className="mb-8 text-gray-500 dark:text-gray-400">Find and apply to open positions</p>

      {loading ? (
        <LoadingSkeleton rows={3} />
      ) : jobs.length === 0 ? (
        <EmptyState icon={Briefcase} title="No jobs available" description="Check back later for new openings." />
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job._id} className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{job.title}</h3>
                  <p className="text-sm text-gray-500">{job.company} · {job.location}</p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{job.description.substring(0, 200)}...</p>
                  {job.skills?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {job.skills.map((s) => (
                        <span key={s} className="rounded-full bg-primary-100 px-2 py-0.5 text-xs text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">{s}</span>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleApply(job._id)}
                  disabled={applying === job._id}
                  className="flex shrink-0 items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  {applying === job._id ? 'Applying...' : 'Apply'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default BrowseJobs;
