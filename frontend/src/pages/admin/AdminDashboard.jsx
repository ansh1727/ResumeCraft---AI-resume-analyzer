import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import { adminAPI } from '../../services';
import { Users, FileText, Brain, Briefcase, ClipboardList } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminAPI.getStats()
      .then(({ data }) => setStats(data.stats))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const cards = stats ? [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-blue-600' },
    { label: 'Total Resumes', value: stats.totalResumes, icon: FileText, color: 'text-green-600' },
    { label: 'Total Analyses', value: stats.totalAnalyses, icon: Brain, color: 'text-purple-600' },
    { label: 'Total Jobs', value: stats.totalJobs, icon: Briefcase, color: 'text-orange-600' },
    { label: 'Applications', value: stats.totalApplications, icon: ClipboardList, color: 'text-red-600' },
  ] : [];

  return (
    <DashboardLayout>
      <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
      <p className="mb-8 text-gray-500 dark:text-gray-400">Platform overview and statistics</p>

      {loading ? (
        <LoadingSkeleton rows={3} />
      ) : (
        <>
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {cards.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <Icon className={`mb-2 h-6 w-6 ${color}`} />
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
              </div>
            ))}
          </div>

          {stats?.usersByRole && (
            <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Users by Role</h3>
              <div className="flex gap-6">
                {Object.entries(stats.usersByRole).map(([role, count]) => (
                  <div key={role} className="text-center">
                    <p className="text-2xl font-bold capitalize text-primary-600">{count}</p>
                    <p className="text-sm capitalize text-gray-500">{role}s</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {stats?.recentUsers?.length > 0 && (
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Recent Users</h3>
              <div className="space-y-3">
                {stats.recentUsers.map((u) => (
                  <div key={u._id} className="flex items-center justify-between text-sm">
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">{u.name}</span>
                      <span className="ml-2 text-gray-500">{u.email}</span>
                    </div>
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs capitalize dark:bg-gray-800">{u.role}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;
