import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import EmptyState from '../../components/EmptyState';
import ScoreRing from '../../components/ScoreRing';
import { jobAPI } from '../../services';
import toast from 'react-hot-toast';
import { Users } from 'lucide-react';

const Applicants = () => {
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(searchParams.get('job') || '');
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    jobAPI.getMyJobs().then(({ data }) => {
      setJobs(data.jobs);
      if (!selectedJob && data.jobs.length > 0) setSelectedJob(data.jobs[0]._id);
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedJob) { setLoading(false); return; }
    setLoading(true);
    jobAPI.getApplicants(selectedJob)
      .then(({ data }) => setApplicants(data.applicants))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, [selectedJob]);

  return (
    <DashboardLayout>
      <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Applicants</h1>
      <p className="mb-6 text-gray-500 dark:text-gray-400">Review candidates and their job match scores</p>

      {jobs.length > 0 && (
        <select
          value={selectedJob}
          onChange={(e) => setSelectedJob(e.target.value)}
          className="mb-6 rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        >
          {jobs.map((j) => (
            <option key={j._id} value={j._id}>{j.title} - {j.company}</option>
          ))}
        </select>
      )}

      {loading ? (
        <LoadingSkeleton rows={3} />
      ) : applicants.length === 0 ? (
        <EmptyState icon={Users} title="No applicants yet" description="Applicants will appear here when candidates apply to your jobs." />
      ) : (
        <div className="space-y-4">
          {applicants.map((app) => (
            <div key={app._id} className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{app.candidate?.name}</h3>
                  <p className="text-sm text-gray-500">{app.candidate?.email}</p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    Resume: {app.resume?.fileName}
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <ScoreRing score={app.matchScore} label="Match Score" />
                  </div>
                  {app.latestAnalysis && (
                    <div className="relative">
                      <ScoreRing score={app.latestAnalysis.employabilityScore} label="Employability" />
                    </div>
                  )}
                </div>
              </div>
              {app.matchingSkills?.length > 0 && (
                <div className="mt-4">
                  <p className="mb-1 text-xs font-medium text-gray-500">Matching Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {app.matchingSkills.map((s) => (
                      <span key={s} className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-300">{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Applicants;
