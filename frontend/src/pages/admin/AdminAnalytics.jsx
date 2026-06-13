import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import { adminAPI } from '../../services';
import { BarChart3 } from 'lucide-react';

const AdminAnalytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminAPI.getStats()
      .then(({ data }) => setStats(data.stats))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <DashboardLayout><LoadingSkeleton rows={4} /></DashboardLayout>;

  const metrics = [
    { label: 'Users', value: stats?.totalUsers, pct: 100 },
    { label: 'Resumes', value: stats?.totalResumes, pct: stats?.totalUsers ? (stats.totalResumes / stats.totalUsers * 100).toFixed(0) : 0 },
    { label: 'Analyses', value: stats?.totalAnalyses, pct: stats?.totalResumes ? (stats.totalAnalyses / stats.totalResumes * 100).toFixed(0) : 0 },
    { label: 'Jobs', value: stats?.totalJobs, pct: 100 },
    { label: 'Applications', value: stats?.totalApplications, pct: stats?.totalJobs ? (stats.totalApplications / stats.totalJobs * 100).toFixed(0) : 0 },
  ];

  return (
    <DashboardLayout>
      <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Platform Analytics</h1>
      <p className="mb-8 text-gray-500 dark:text-gray-400">Detailed platform usage metrics</p>

      <div className="space-y-6">
        {metrics.map(({ label, value, pct }) => (
          <div key={label} className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium text-gray-900 dark:text-white">{label}</span>
              <span className="text-2xl font-bold text-primary-600">{value ?? 0}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-full rounded-full bg-primary-600 transition-all"
                style={{ width: `${Math.min(pct, 100)}%` }}
              />
            </div>
          </div>
        ))}

        {stats?.recentAnalyses?.length > 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Recent Analyses</h3>
            </div>
            <div className="space-y-3">
              {stats.recentAnalyses.map((a) => (
                <div key={a._id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-900 dark:text-white">{a.user?.name || 'Unknown'}</span>
                  <span className="text-gray-500">ATS: {a.atsScore} · Employability: {a.employabilityScore}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminAnalytics;
