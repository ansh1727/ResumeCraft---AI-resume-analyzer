import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import EmptyState from '../../components/EmptyState';
import { jobAPI } from '../../services';
import toast from 'react-hot-toast';
import { Briefcase, Edit, Trash2, Users } from 'lucide-react';

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({});

  const fetchJobs = async () => {
    try {
      const { data } = await jobAPI.getMyJobs();
      setJobs(data.jobs);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this job post?')) return;
    try {
      await jobAPI.delete(id);
      toast.success('Job deleted');
      setJobs(jobs.filter((j) => j._id !== id));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const startEdit = (job) => {
    setEditing(job._id);
    setEditForm({
      title: job.title,
      company: job.company,
      description: job.description,
      skills: job.skills?.join(', ') || '',
      location: job.location,
    });
  };

  const handleUpdate = async (id) => {
    try {
      await jobAPI.update(id, {
        ...editForm,
        skills: editForm.skills.split(',').map((s) => s.trim()).filter(Boolean),
      });
      toast.success('Job updated');
      setEditing(null);
      fetchJobs();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Jobs</h1>
          <p className="text-gray-500 dark:text-gray-400">Edit or delete your job postings</p>
        </div>
        <Link to="/recruiter/post-job" className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white">
          + New Job
        </Link>
      </div>

      {loading ? (
        <LoadingSkeleton rows={3} />
      ) : jobs.length === 0 ? (
        <EmptyState icon={Briefcase} title="No jobs posted" description="Create your first job posting to start receiving applications." />
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job._id} className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              {editing === job._id ? (
                <div className="space-y-3">
                  <input
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full rounded-lg border px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  />
                  <input
                    value={editForm.company}
                    onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                    className="w-full rounded-lg border px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  />
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    rows={4}
                    className="w-full rounded-lg border px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  />
                  <div className="flex gap-2">
                    <button onClick={() => handleUpdate(job._id)} className="rounded-lg bg-primary-600 px-4 py-2 text-sm text-white">Save</button>
                    <button onClick={() => setEditing(null)} className="rounded-lg border px-4 py-2 text-sm dark:border-gray-600">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{job.title}</h3>
                    <p className="text-sm text-gray-500">{job.company} · {job.location}</p>
                    <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">{job.description}</p>
                    {job.skills?.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {job.skills.map((s) => (
                          <span key={s} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs dark:bg-gray-800">{s}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/recruiter/applicants?job=${job._id}`}
                      className="flex items-center gap-1 rounded-lg bg-green-600 px-3 py-2 text-sm text-white"
                    >
                      <Users className="h-4 w-4" /> Applicants
                    </Link>
                    <button onClick={() => startEdit(job)} className="rounded-lg border p-2 dark:border-gray-600">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(job._id)} className="rounded-lg border border-red-200 p-2 text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
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

export default ManageJobs;
