import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import { resumeAPI, jobAPI } from '../../services';
import { FileText, Brain, Target, Upload } from 'lucide-react';

const CandidateDashboard = () => {
  const [stats, setStats] = useState({ resumes: 0, analyses: 0, applications: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resumesRes, analysesRes, appsRes] = await Promise.all([
          resumeAPI.getAll(),
          resumeAPI.getAnalyses(),
          jobAPI.getMyApplications(),
        ]);
        setStats({
          resumes: resumesRes.data.count,
          analyses: analysesRes.data.count,
          applications: appsRes.data.count,
        });
      } catch {
        /* empty */
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const cards = [
    { label: 'Resumes Uploaded', value: stats.resumes, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { label: 'Resume Analyses', value: stats.analyses, icon: Brain, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30' },
    { label: 'Job Applications', value: stats.applications, icon: Target, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30' },
  ];

  const quickActions = [
    { to: '/candidate/upload', label: 'Upload Resume', icon: Upload, desc: 'Upload a new PDF resume' },
    { to: '/candidate/analysis', label: 'Analyze Resume', icon: Brain, desc: 'Review your latest resume' },
    { to: '/candidate/job-match', label: 'Match Job', icon: Target, desc: 'Compare resume with job description' },
  ];

  return (
    <DashboardLayout>
      <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Candidate Dashboard</h1>
      <p className="mb-8 text-gray-500 dark:text-gray-400">Manage your resumes and track career insights</p>

      {loading ? (
        <LoadingSkeleton rows={3} />
      ) : (
        <>
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {cards.map(({ label, value, icon: Icon, color, bg }) => (
              <div key={label} className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
                    <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
                  </div>
                  <div className={`rounded-lg p-3 ${bg}`}>
                    <Icon className={`h-6 w-6 ${color}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {quickActions.map(({ to, label, icon: Icon, desc }) => (
              <Link
                key={to}
                to={to}
                className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
              >
                <Icon className="mb-3 h-6 w-6 text-primary-600" />
                <h3 className="font-semibold text-gray-900 dark:text-white">{label}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{desc}</p>
              </Link>
            ))}
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default CandidateDashboard;
