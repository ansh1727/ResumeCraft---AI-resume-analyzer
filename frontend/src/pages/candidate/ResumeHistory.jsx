import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import EmptyState, { FileText } from '../../components/EmptyState';
import { resumeAPI } from '../../services';
import toast from 'react-hot-toast';
import { Trash2, Brain, Mail, Phone, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const ResumeHistory = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchResumes = async () => {
    try {
      const { data } = await resumeAPI.getAll();
      setResumes(data.resumes);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchResumes(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this resume?')) return;
    try {
      await resumeAPI.delete(id);
      toast.success('Resume deleted');
      setResumes(resumes.filter((r) => r._id !== id));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleAnalyze = async (id) => {
    try {
      toast.loading('Analyzing your resume...', { id: 'analyze' });
      await resumeAPI.analyze(id);
      toast.success('Analysis complete!', { id: 'analyze' });
    } catch (err) {
      toast.error(err.message, { id: 'analyze' });
    }
  };

  return (
    <DashboardLayout>
      <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Resume History</h1>
      <p className="mb-8 text-gray-500 dark:text-gray-400">View and manage your uploaded resumes</p>

      {loading ? (
        <LoadingSkeleton rows={3} />
      ) : resumes.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No resumes yet"
          description="Upload your first PDF resume to get detailed scores and suggestions."
          action={
            <Link to="/candidate/upload" className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white">
              Upload Resume
            </Link>
          }
        />
      ) : (
        <div className="space-y-4">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-red-500" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">{resume.fileName}</h3>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Uploaded {new Date(resume.uploadedAt).toLocaleDateString()}
                  </p>
                  {resume.extractedData && (
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {resume.extractedData.name && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <User className="h-4 w-4" /> {resume.extractedData.name}
                        </div>
                      )}
                      {resume.extractedData.email && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <Mail className="h-4 w-4" /> {resume.extractedData.email}
                        </div>
                      )}
                      {resume.extractedData.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <Phone className="h-4 w-4" /> {resume.extractedData.phone}
                        </div>
                      )}
                    </div>
                  )}
                  {resume.extractedData?.skills?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {resume.extractedData.skills.slice(0, 8).map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAnalyze(resume._id)}
                    className="flex items-center gap-1.5 rounded-lg bg-primary-600 px-3 py-2 text-sm font-medium text-white hover:bg-primary-700"
                  >
                    <Brain className="h-4 w-4" /> Analyze
                  </button>
                  <button
                    onClick={() => handleDelete(resume._id)}
                    className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default ResumeHistory;
