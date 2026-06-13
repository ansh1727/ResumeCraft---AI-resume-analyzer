import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Target, Shield, Zap } from 'lucide-react';

const Home = () => {
  const features = [
    { icon: Sparkles, title: 'Resume Analysis', desc: 'Get instant ATS scores and focused suggestions for improving your resume.' },
    { icon: Target, title: 'Job Matching', desc: 'Compare your resume against job descriptions and find missing keywords.' },
    { icon: Shield, title: 'Secure & Private', desc: 'JWT authentication with encrypted passwords and secure file uploads.' },
    { icon: Zap, title: 'Fast Parsing', desc: 'Extract skills, experience, and education from PDF resumes instantly.' },
  ];

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white px-4 py-24 dark:from-slate-900 dark:to-slate-950 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-block rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700 dark:bg-primary-900 dark:text-primary-300">
            Resume Review Platform
          </span>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
            Build a Stronger Resume with{' '}
            <span className="gradient-text">Practical</span> Career Insights
          </h1>
          <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
            Upload your resume, get ATS scores, match against job descriptions, and receive
            personalized suggestions to strengthen your next application.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/register"
              className="flex items-center gap-2 rounded-xl bg-primary-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-600/25 hover:bg-primary-700"
            >
              Get Started Free <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/features"
              className="rounded-xl border border-gray-300 px-8 py-3.5 text-base font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Why Choose ResumeCraft?
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="colorful-card rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-4 inline-flex rounded-lg bg-primary-100 p-3 dark:bg-primary-900/30">
                  <Icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-700 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Ready to optimize your resume?</h2>
          <p className="mb-8 text-primary-100">
            Review your resume, identify gaps, and make better career decisions.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 font-semibold text-primary-600 hover:bg-primary-50"
          >
            Start Free Today <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
