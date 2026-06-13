import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import { jobAPI } from '../../services';
import { Briefcase, Users, FileText } from 'lucide-react';

const RecruiterDashboard = () => {
  const [stats, setStats] = useState({ jobs: 0, applicants: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await jobAPI.getMyJobs();
        let totalApplicants = 0;
        for (const job of data.jobs) {
          try {
            const appRes = await jobAPI.getApplicants(job._id);
            totalApplicants += appRes.data.count;
          } catch { /* skip */ }
        }
        setStats({ jobs: data.count, applicants: totalApplicants });
      } catch { /* empty */ } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Recruiter Dashboard</h1>
      <p className="mb-8 text-gray-500 dark:text-gray-400">Manage job posts and review applicants</p>

      {loading ? (
        <LoadingSkeleton rows={2} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Jobs</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.jobs}</p>
              </div>
              <Briefcase className="h-8 w-8 text-primary-600" />
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Applicants</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.applicants}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Candidate Match Scoring</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">Enabled</p>
              </div>
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default RecruiterDashboard;
