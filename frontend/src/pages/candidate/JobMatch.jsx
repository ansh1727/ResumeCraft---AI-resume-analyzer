import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import ScoreRing from '../../components/ScoreRing';
import { matchAPI, resumeAPI } from '../../services';
import toast from 'react-hot-toast';
import { Target, Upload, FileText } from 'lucide-react';

const JobMatch = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState('');
  const [file, setFile] = useState(null);
  const [useUpload, setUseUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    resumeAPI.getAll().then(({ data }) => {
      setResumes(data.resumes);
      if (data.resumes.length > 0) setSelectedResume(data.resumes[0]._id);
    }).catch(() => {});
  }, []);

  const handleMatch = async () => {
    if (jobDescription.trim().length < 20) {
      return toast.error('Job description must be at least 20 characters');
    }
    if (!useUpload && !selectedResume) {
      return toast.error('Please select a resume or upload one');
    }
    if (useUpload && !file) {
      return toast.error('Please upload a PDF resume');
    }

    setLoading(true);
    setResult(null);
    try {
      const { data } = await matchAPI.matchJob(
        { jobDescription, resumeId: useUpload ? undefined : selectedResume },
        useUpload ? file : null
      );
      setResult(data.match);
      toast.success('Job match analysis complete!');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Job Match</h1>
      <p className="mb-8 text-gray-500 dark:text-gray-400">
        Compare your resume against a job description and identify skill gaps
      </p>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={10}
              placeholder="Paste the job description here..."
              className="w-full rounded-xl border border-gray-300 p-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Resume Source
            </label>
            <div className="mb-3 flex gap-2">
              <button
                onClick={() => setUseUpload(false)}
                className={`rounded-lg px-4 py-2 text-sm font-medium ${
                  !useUpload ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
                }`}
              >
                Saved Resume
              </button>
              <button
                onClick={() => setUseUpload(true)}
                className={`rounded-lg px-4 py-2 text-sm font-medium ${
                  useUpload ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
                }`}
              >
                Upload New
              </button>
            </div>

            {!useUpload ? (
              <select
                value={selectedResume}
                onChange={(e) => setSelectedResume(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              >
                {resumes.map((r) => (
                  <option key={r._id} value={r._id}>{r.fileName}</option>
                ))}
              </select>
            ) : (
              <div className="rounded-xl border-2 border-dashed border-gray-300 p-6 text-center dark:border-gray-600">
                <Upload className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="text-sm"
                />
                {file && (
                  <p className="mt-2 flex items-center justify-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                    <FileText className="h-4 w-4" /> {file.name}
                  </p>
                )}
              </div>
            )}
          </div>

          <button
            onClick={handleMatch}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 py-3 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
          >
            <Target className="h-4 w-4" />
            {loading ? 'Analyzing Match...' : 'Analyze Match'}
          </button>
        </div>

        <div>
          {result ? (
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <h3 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">Match Results</h3>
              <div className="mb-6 flex justify-center gap-8">
                <div className="relative">
                  <ScoreRing score={result.matchPercentage} label="Match %" size="lg" />
                </div>
                <div className="relative">
                  <ScoreRing score={result.atsCompatibilityScore} label="ATS Score" size="lg" />
                </div>
              </div>

              {result.matchingSkills?.length > 0 && (
                <div className="mb-4">
                  <h4 className="mb-2 text-sm font-semibold text-green-700 dark:text-green-400">Matching Skills</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {result.matchingSkills.map((s) => (
                      <span key={s} className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {result.missingKeywords?.length > 0 && (
                <div className="mb-4">
                  <h4 className="mb-2 text-sm font-semibold text-red-700 dark:text-red-400">Missing Keywords</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {result.missingKeywords.map((k) => (
                      <span key={k} className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-300">{k}</span>
                    ))}
                  </div>
                </div>
              )}

              {result.improvementSuggestions?.length > 0 && (
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">Suggestions</h4>
                  <ul className="space-y-2">
                    {result.improvementSuggestions.map((s, i) => (
                      <li key={i} className="rounded-lg bg-primary-50 px-3 py-2 text-sm text-primary-800 dark:bg-primary-900/20 dark:text-primary-200">{s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-full min-h-[300px] items-center justify-center rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Match results will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JobMatch;
