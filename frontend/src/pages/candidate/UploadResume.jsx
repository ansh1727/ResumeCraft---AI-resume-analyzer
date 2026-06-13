import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { resumeAPI } from '../../services';
import toast from 'react-hot-toast';
import { Upload, FileText } from 'lucide-react';

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) return toast.error('Please select a PDF file');
    if (file.type !== 'application/pdf') return toast.error('Only PDF files are allowed');

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('resume', file);
      await resumeAPI.upload(formData);
      toast.success('Resume uploaded and parsed successfully!');
      navigate('/candidate/history');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped?.type === 'application/pdf') setFile(dropped);
    else toast.error('Only PDF files are allowed');
  };

  return (
    <DashboardLayout>
      <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Upload Resume</h1>
      <p className="mb-8 text-gray-500 dark:text-gray-400">Upload your PDF resume for detailed analysis and job matching</p>

      <div className="max-w-xl">
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`rounded-xl border-2 border-dashed p-12 text-center transition-colors ${
            dragOver
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
              : 'border-gray-300 dark:border-gray-600'
          }`}
        >
          <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <p className="mb-2 font-medium text-gray-900 dark:text-white">
            Drag & drop your PDF resume here
          </p>
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">or click to browse (max 5MB)</p>
          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
            id="resume-upload"
          />
          <label
            htmlFor="resume-upload"
            className="cursor-pointer rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200"
          >
            Browse Files
          </label>
        </div>

        {file && (
          <div className="mt-4 flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
            <FileText className="h-8 w-8 text-red-500" />
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-white">{file.name}</p>
              <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="mt-6 w-full rounded-lg bg-primary-600 py-3 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
        >
          {loading ? 'Uploading & Parsing...' : 'Upload Resume'}
        </button>
      </div>
    </DashboardLayout>
  );
};

export default UploadResume;
