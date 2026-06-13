import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { jobAPI } from '../../services';
import toast from 'react-hot-toast';
import { Briefcase } from 'lucide-react';

const PostJob = () => {
  const [form, setForm] = useState({
    title: '', company: '', description: '', skills: '', location: 'Remote',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await jobAPI.create({
        ...form,
        skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
      });
      toast.success('Job posted successfully!');
      navigate('/recruiter/manage-jobs');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key: 'title', label: 'Job Title', placeholder: 'Senior Full Stack Developer' },
    { key: 'company', label: 'Company', placeholder: 'Tech Corp Inc.' },
    { key: 'location', label: 'Location', placeholder: 'Remote / New York, NY' },
  ];

  return (
    <DashboardLayout>
      <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Post a Job</h1>
      <p className="mb-8 text-gray-500 dark:text-gray-400">Create a new job listing for candidates to apply</p>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
        {fields.map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
            <input
              type="text"
              required={key !== 'location'}
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              placeholder={placeholder}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>
        ))}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Job Description</label>
          <textarea
            required
            rows={8}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Describe the role, requirements, and responsibilities..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Required Skills (comma-separated)
          </label>
          <input
            type="text"
            value={form.skills}
            onChange={(e) => setForm({ ...form, skills: e.target.value })}
            placeholder="React, Node.js, MongoDB, TypeScript"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
        >
          <Briefcase className="h-4 w-4" />
          {loading ? 'Posting...' : 'Post Job'}
        </button>
      </form>
    </DashboardLayout>
  );
};

export default PostJob;
