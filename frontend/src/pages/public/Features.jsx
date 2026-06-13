import { Brain, Target, Upload, BarChart3, Users, Shield, FileSearch, Sparkles } from 'lucide-react';

const Features = () => {
  const features = [
    { icon: Upload, title: 'PDF Resume Upload', desc: 'Upload PDF resumes with secure validation. Extract name, email, skills, education, projects, experience, and certifications automatically.' },
    { icon: Brain, title: 'Resume Analysis', desc: 'Get ATS, technical skill, project quality, formatting, and overall employability scores.' },
    { icon: Target, title: 'Job Description Matching', desc: 'Paste any job description and get match percentage, missing keywords, matching skills, and ATS compatibility score.' },
    { icon: BarChart3, title: 'Detailed Insights', desc: 'Receive missing skills, weak sections, improvement suggestions, recommended technologies, projects, and certifications.' },
    { icon: Users, title: 'Recruiter Dashboard', desc: 'Recruiters can post jobs, manage listings, view applicants, and compare candidate match scores.' },
    { icon: Shield, title: 'Enterprise Security', desc: 'JWT auth with HttpOnly cookies, bcrypt password hashing, rate limiting, Helmet, CORS, and input validation.' },
    { icon: FileSearch, title: 'Resume History', desc: 'Track uploaded resumes and previous analysis results in one organized dashboard.' },
    { icon: Sparkles, title: 'Admin Analytics', desc: 'Platform-wide statistics including total users, resumes, analyses, and job posts.' },
  ];

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">Features</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Everything you need to analyze resumes, match jobs, and make smarter hiring decisions.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
            >
              <Icon className="mb-4 h-8 w-8 text-primary-600" />
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
