import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import EmptyState from '../../components/EmptyState';
import ScoreRing from '../../components/ScoreRing';
import { resumeAPI } from '../../services';
import toast from 'react-hot-toast';
import { Brain, ChevronDown, ChevronUp } from 'lucide-react';

const ResumeAnalysis = () => {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await resumeAPI.getAnalyses();
        setAnalyses(data.analyses);
      } catch (err) {
        toast.error(err.message, { id: 'load-resume-analyses' });
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const ScoreCard = ({ label, score }) => (
    <div className="relative flex flex-col items-center rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <ScoreRing score={score} size="md" />
      <span className="mt-2 text-xs font-medium text-gray-500 dark:text-gray-400">{label}</span>
    </div>
  );

  const ListSection = ({ title, items, color = 'primary' }) => {
    if (!items?.length) return null;
    const colors = {
      primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300',
      red: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
      green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
      yellow: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    };
    return (
      <div className="mt-4">
        <h4 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">{title}</h4>
        <ul className="space-y-1.5">
          {items.map((item, i) => (
            <li key={i} className={`rounded-lg px-3 py-2 text-sm ${colors[color]}`}>{item}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Resume Analysis</h1>
      <p className="mb-8 text-gray-500 dark:text-gray-400">Review your resume scores, strengths, and improvement suggestions</p>

      {loading ? (
        <LoadingSkeleton rows={3} />
      ) : analyses.length === 0 ? (
        <EmptyState
          icon={Brain}
          title="No analyses yet"
          description="Upload a resume and run an analysis to see your scores and suggestions."
        />
      ) : (
        <div className="space-y-6">
          {analyses.map((analysis) => (
            <div
              key={analysis._id}
              className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
            >
              <button
                onClick={() => setExpanded(expanded === analysis._id ? null : analysis._id)}
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {analysis.resume?.fileName || 'Resume Analysis'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(analysis.createdAt).toLocaleString()} · Employability: {analysis.employabilityScore}/100
                  </p>
                </div>
                {expanded === analysis._id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>

              {expanded === analysis._id && (
                <div className="border-t border-gray-200 p-6 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                    <ScoreCard label="ATS Score" score={analysis.atsScore} />
                    <ScoreCard label="Technical Skills" score={analysis.technicalSkillScore} />
                    <ScoreCard label="Project Quality" score={analysis.projectQualityScore} />
                    <ScoreCard label="Formatting" score={analysis.resumeFormattingScore} />
                    <ScoreCard label="Employability" score={analysis.employabilityScore} />
                  </div>
                  <ListSection title="Missing Skills" items={analysis.missingSkills} color="red" />
                  <ListSection title="Weak Sections" items={analysis.weakSections} color="yellow" />
                  <ListSection title="Improvement Suggestions" items={analysis.suggestions} />
                  <ListSection title="Recommended Technologies" items={analysis.recommendedTechnologies} color="green" />
                  <ListSection title="Recommended Projects" items={analysis.recommendedProjects} color="green" />
                  <ListSection title="Recommended Certifications" items={analysis.recommendedCertifications} color="green" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default ResumeAnalysis;
