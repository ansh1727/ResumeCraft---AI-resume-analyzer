import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import EmptyState from '../../components/EmptyState';
import { adminAPI } from '../../services';
import toast from 'react-hot-toast';
import { Briefcase, Trash2 } from 'lucide-react';

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminAPI.getJobs()
      .then(({ data }) => setJobs(data.jobs))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this job post?')) return;
    try {
      await adminAPI.deleteJob(id);
      toast.success('Job deleted');
      setJobs(jobs.filter((j) => j._id !== id));
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Manage Jobs</h1>

      {loading ? (
        <LoadingSkeleton rows={3} />
      ) : jobs.length === 0 ? (
        <EmptyState icon={Briefcase} title="No jobs" description="No job posts on the platform yet." />
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job._id} className="flex items-start justify-between rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{job.title}</h3>
                <p className="text-sm text-gray-500">{job.company} · Posted by {job.recruiter?.name}</p>
                <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">{job.description}</p>
              </div>
              <button onClick={() => handleDelete(job._id)} className="text-red-600 hover:text-red-700">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminJobs;
