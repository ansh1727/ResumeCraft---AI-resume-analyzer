import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      desc: 'Perfect for getting started',
      features: ['3 resume uploads', '5 analyses/month', 'Job match (basic)', 'PDF parsing'],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '$19',
      period: '/month',
      desc: 'For active job seekers',
      features: ['Unlimited uploads', 'Unlimited analyses', 'Advanced job matching', 'Priority support', 'Resume history'],
      cta: 'Start Pro Trial',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      desc: 'For recruiting teams',
      features: ['Everything in Pro', 'Recruiter dashboard', 'Applicant tracking', 'Team management', 'API access'],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">Simple Pricing</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Choose the plan that fits your needs. Start free, upgrade anytime.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-8 ${
                plan.highlighted
                  ? 'border-primary-600 bg-primary-50 shadow-xl dark:border-primary-500 dark:bg-primary-900/20'
                  : 'border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900'
              }`}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{plan.desc}</p>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                <span className="text-gray-500 dark:text-gray-400">{plan.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Check className="h-4 w-4 shrink-0 text-primary-600" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className={`mt-8 block rounded-xl py-3 text-center text-sm font-semibold ${
                  plan.highlighted
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
